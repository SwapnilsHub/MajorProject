'use client';

import { createElement, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { usePDF } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import { loadTemplateComponent } from './templates/registry';
import { getTemplateById } from '@/config/templates';
import PreviewToolbar from './PreviewToolbar';
import PreviewFullscreenModal from './PreviewFullscreenModal';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1.8;
const ZOOM_STEP = 0.2;
// Debounce: wait 600ms after last keystroke before regenerating PDF.
const REFRESH_DEBOUNCE_MS = 600;
// US Letter aspect ratio (height / width), used to approximate "fit page".
const PAGE_ASPECT = 11 / 8.5;

const Loader = () => (
    <div className="flex min-h-[24rem] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
    </div>
);

// Resolves the code-split PDF component for the currently selected template.
function useTemplateComponent(templateId) {
    const [loaded, setLoaded] = useState(null); // { id, Component }

    useEffect(() => {
        let cancelled = false;

        loadTemplateComponent(templateId).then(resolved => {
            if (!cancelled) setLoaded({ id: templateId, Component: resolved });
        });

        return () => {
            cancelled = true;
        };
    }, [templateId]);

    return loaded?.id === templateId ? loaded.Component : null;
}

/**
 * Live PDF preview pane.
 * Key improvements:
 * - No blinking: old page stays visible while new PDF renders. A subtle
 *   overlay spinner shows that an update is in progress, without unmounting
 *   the rendered page.
 * - Fills the available panel width (no hard max-w cap).
 * - 600ms debounce so rapid typing only regenerates once typing pauses.
 */
const Preview = ({ onReady = () => {} }) => {
    const parentRef = useRef(null);
    const resumeData = useSelector(state => state.resume);
    const { selectedTemplate, saved: _saved, ...content } = resumeData;

    const TemplateComponent = useTemplateComponent(selectedTemplate);

    const contentKey = JSON.stringify(content);
    const pdfDocument = useMemo(() => {
        if (!TemplateComponent) return null;
        return createElement(TemplateComponent, { data: content });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [TemplateComponent, contentKey, selectedTemplate]);

    const [instance, updateInstance] = usePDF({ document: pdfDocument ?? undefined });

    // Whether we have ever shown a successful page (used to suppress the
    // initial loader replacement — we keep the old page visible on updates).
    const [hasRendered, setHasRendered] = useState(false);

    // Track whether the PDF is being updated (not first load) so we can show
    // a subtle overlay spinner rather than unmounting the existing page.
    const [isUpdating, setIsUpdating] = useState(false);

    // Debounced refresh: content change → wait 600 ms → regenerate PDF.
    useEffect(() => {
        if (!pdfDocument) return undefined;

        setIsUpdating(true);
        const timer = setTimeout(() => {
            updateInstance(pdfDocument);
        }, REFRESH_DEBOUNCE_MS);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentKey]);

    // When template switches, refresh immediately (no debounce needed).
    useEffect(() => {
        if (pdfDocument) {
            setIsUpdating(true);
            updateInstance(pdfDocument);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [TemplateComponent, selectedTemplate]);

    // When instance finishes loading, clear the updating flag.
    useEffect(() => {
        if (!instance.loading) {
            setIsUpdating(false);
            if (instance.url && !instance.error) {
                setHasRendered(true);
            }
        }
    }, [instance.loading, instance.url, instance.error]);

    // Measured via ResizeObserver so the render never reads the ref directly.
    const [pageWidth, setPageWidth] = useState(null);
    const [containerHeight, setContainerHeight] = useState(null);
    const [customZoom, setCustomZoom] = useState(1);
    const [zoomMode, setZoomMode] = useState('fitWidth');
    const [fullscreenOpen, setFullscreenOpen] = useState(false);

    useEffect(() => {
        const el = parentRef.current;
        if (!el || typeof ResizeObserver === 'undefined') return undefined;

        const observer = new ResizeObserver(() => {
            setPageWidth(el.clientWidth - 16);
            setContainerHeight(el.clientHeight - 16);
        });
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    const zoom =
        zoomMode === 'fitWidth'
            ? 1
            : zoomMode === 'fitPage' && pageWidth && containerHeight
              ? Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, containerHeight / (pageWidth * PAGE_ASPECT)))
              : customZoom;

    const templateMeta = getTemplateById(selectedTemplate);
    const isReady = pdfDocument && !instance.loading && instance.url && !instance.error;
    const renderWidth = pageWidth != null ? Math.round(pageWidth * zoom) : undefined;
    const filename = `${resumeData.contact?.name || 'resume'}.pdf`;

    useEffect(() => {
        onReady?.({
            url: isReady ? instance.url : null,
            filename,
            error: instance.error || null,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady, instance.url, instance.error, filename]);

    const zoomOut = () => {
        setCustomZoom(Math.max(MIN_ZOOM, +(zoom - ZOOM_STEP).toFixed(2)));
        setZoomMode('custom');
    };
    const zoomIn = () => {
        setCustomZoom(Math.min(MAX_ZOOM, +(zoom + ZOOM_STEP).toFixed(2)));
        setZoomMode('custom');
    };
    const handlePrint = () => {
        if (!instance.url) return;
        const win = window.open(instance.url, '_blank');
        win?.addEventListener('load', () => win.print());
    };

    const handleDownloadDocx = async () => {
        try {
            const { exportResume } = await import('@/lib/importExport/exporters');
            await exportResume('docx', resumeData);
        } catch (err) {
            console.error('Failed to export DOCX:', err);
        }
    };

    return (
        <div className="flex w-full flex-col gap-3">
            <PreviewToolbar
                zoomPercent={Math.round(zoom * 100)}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                canZoomIn={zoom < MAX_ZOOM}
                canZoomOut={zoom > MIN_ZOOM}
                zoomMode={zoomMode}
                onFitWidth={() => setZoomMode('fitWidth')}
                onFitPage={() => setZoomMode('fitPage')}
                onFullscreen={() => setFullscreenOpen(true)}
                onPrint={handlePrint}
                downloadUrl={isReady ? instance.url : null}
                downloadFilename={filename}
                onDownloadDocx={handleDownloadDocx}
                disabled={!isReady}
            />

            <div className="relative flex flex-col overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-surface-2/40 to-surface shadow-ds-md">
                {/* Status bar */}
                <div className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-3 py-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Live
                    </span>
                    {templateMeta && (
                        <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-fg-muted">
                            {templateMeta.name}
                        </span>
                    )}
                    {/* Subtle update indicator — doesn't replace the page */}
                    {isUpdating && hasRendered && (
                        <span className="ml-auto inline-flex items-center gap-1 text-xs text-fg-subtle">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Updating…
                        </span>
                    )}
                </div>

                {/* PDF viewport */}
                <div
                    ref={parentRef}
                    className="relative flex min-h-[65vh] w-full items-start justify-center overflow-auto bg-canvas p-2.5 md:p-3.5"
                >
                    {instance.error ? (
                        <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-red-600 dark:text-red-400">
                            <p className="font-semibold">Couldn&apos;t generate the PDF preview.</p>
                            <p className="text-red-500">Please check your resume fields and try again.</p>
                        </div>
                    ) : !hasRendered && instance.loading ? (
                        /* Only show the big loader on the very first load */
                        <Loader />
                    ) : instance.url ? (
                        /*
                         * Keep the Document mounted across updates.
                         * react-pdf's <Document> re-fetches the blob URL when `file`
                         * changes; we intentionally keep the old page visible
                         * (by not un-mounting) until the new URL is ready.
                         */
                        <Document
                            key={selectedTemplate}
                            loading={null}
                            file={instance.url}
                            error={
                                <p className="py-10 text-center text-sm text-red-600 dark:text-red-400">
                                    Couldn&apos;t render the PDF preview.
                                </p>
                            }
                        >
                            <Page
                                pageNumber={1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                loading={null}
                                width={renderWidth}
                                className="overflow-hidden rounded-lg shadow-ds-lg ring-1 ring-line"
                            />
                        </Document>
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>

            {fullscreenOpen && isReady && (
                <PreviewFullscreenModal url={instance.url} filename={filename} onClose={() => setFullscreenOpen(false)} />
            )}
        </div>
    );
};

export default Preview;
