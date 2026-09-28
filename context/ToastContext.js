'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const ToastContext = createContext(null);

const TONE_ICON = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const TONE_STYLE = {
    success: 'border-green-500/30 bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-200',
    error: 'border-red-500/30 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-200',
    warning: 'border-amber-500/30 bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200',
    info: 'border-blue-500/30 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-200',
};

const DEFAULT_DURATION_MS = 3500;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const idRef = useRef(0);
    const timers = useRef(new Map());

    const dismiss = useCallback(id => {
        const timer = timers.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timers.current.delete(id);
        }
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const showToast = useCallback(
        (message, { tone = 'info', duration = DEFAULT_DURATION_MS, action = null } = {}) => {
            idRef.current += 1;
            const id = idRef.current;
            setToasts(prev => [...prev, { id, message, tone, action }]);
            if (duration > 0) {
                const timer = setTimeout(() => dismiss(id), duration);
                timers.current.set(id, timer);
            }
            return id;
        },
        [dismiss],
    );

    const success = useCallback((msg, opts) => showToast(msg, { ...opts, tone: 'success' }), [showToast]);
    const error = useCallback((msg, opts) => showToast(msg, { ...opts, tone: 'error' }), [showToast]);
    const warning = useCallback((msg, opts) => showToast(msg, { ...opts, tone: 'warning' }), [showToast]);
    const info = useCallback((msg, opts) => showToast(msg, { ...opts, tone: 'info' }), [showToast]);

    const value = useMemo(
        () => ({ showToast, dismiss, success, error, warning, info }),
        [showToast, dismiss, success, error, warning, info],
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                aria-live="polite"
                aria-atomic="true"
                className="pointer-events-none fixed bottom-4 right-4 z-[500] flex max-w-sm flex-col gap-2 p-4"
            >
                <AnimatePresence initial={false}>
                    {toasts.map(toast => {
                        const Icon = TONE_ICON[toast.tone] || Info;
                        const styleClass = TONE_STYLE[toast.tone] || TONE_STYLE.info;
                        return (
                            <motion.div
                                key={toast.id}
                                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                                className={`pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur-md ${styleClass}`}
                            >
                                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                                <span className="flex-1 font-medium">{toast.message}</span>
                                {toast.action && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            toast.action.onClick?.();
                                            dismiss(toast.id);
                                        }}
                                        className="shrink-0 rounded-md border border-current/30 px-2 py-0.5 text-xs font-bold uppercase tracking-wide hover:bg-current/10"
                                    >
                                        {toast.action.label}
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => dismiss(toast.id)}
                                    aria-label="Dismiss notification"
                                    className="shrink-0 rounded-md px-1.5 py-0.5 text-xs opacity-60 hover:bg-current/10 hover:opacity-100"
                                >
                                    ✕
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

const fallbackToast = {
    showToast: () => {},
    dismiss: () => {},
    success: () => {},
    error: () => {},
    warning: () => {},
    info: () => {},
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    return ctx || fallbackToast;
};

export default ToastProvider;
