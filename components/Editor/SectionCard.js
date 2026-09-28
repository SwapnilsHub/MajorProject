'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowUp, ArrowDown, Trash2, Pencil, Minimize2, GripVertical } from 'lucide-react';
import Input from '../UI/ResumeInput';

/**
 * One draggable, expandable entry card for a repeatable section
 * (Experience/Education/Projects/Certificates/Languages). Purely
 * presentational — all mutation logic (dispatches, drag-end reordering)
 * lives in `MultiEditor.js`, which owns the dnd-kit `DndContext`.
 */
const SectionCard = ({ id, index, item, fields, isSelected, count, onSelect, onCollapse, onDelete, onMove, onChange }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 20 : undefined,
    };

    const title = Object.values(item)[0] || 'Untitled';

    return (
        <motion.div
            layout
            ref={setNodeRef}
            style={style}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-b from-surface-2/40 to-surface px-4 py-4 shadow-ds-sm transition-colors ${
                isSelected ? 'border-accent ring-1 ring-accent' : 'border-line hover:border-accent/40'
            } ${isDragging ? 'opacity-80 shadow-ds-lg' : ''}`}
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                    <button
                        type="button"
                        className="cursor-grab touch-none rounded-md p-1 text-fg-muted hover:bg-surface-2 hover:text-fg active:cursor-grabbing"
                        aria-label={`Drag to reorder (item ${index + 1} of ${count})`}
                        {...attributes}
                        {...listeners}
                    >
                        <GripVertical className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => (isSelected ? onCollapse() : onSelect(index))}
                        className="flex min-w-0 items-center gap-2 text-left text-sm font-semibold text-fg md:text-base"
                    >
                        <span className={`h-2 w-2 shrink-0 rounded-full ${isSelected ? 'bg-accent' : 'bg-fg-muted/40'}`} />
                        <span className="truncate">{title}</span>
                    </button>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        disabled={index === 0}
                        className="rounded-lg p-2 text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                        onClick={() => onMove(index, 'up')}
                        title="Move up"
                        aria-label="Move item up"
                    >
                        <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        disabled={index === count - 1}
                        className="rounded-lg p-2 text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                        onClick={() => onMove(index, 'down')}
                        title="Move down"
                        aria-label="Move item down"
                    >
                        <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        className="rounded-lg p-2 text-accent transition-colors hover:bg-accent/10"
                        onClick={() => (isSelected ? onCollapse() : onSelect(index))}
                        title={isSelected ? 'Collapse' : 'Edit'}
                        aria-label={isSelected ? 'Collapse item' : 'Edit item'}
                        aria-expanded={isSelected}
                    >
                        {isSelected ? <Minimize2 className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                    </button>
                    <button
                        type="button"
                        className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-500/10"
                        onClick={() => onDelete(index)}
                        title="Delete"
                        aria-label="Delete item"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <AnimatePresence initial={false}>
                {isSelected && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 border-t border-line pt-4"
                    >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {fields.map(field => (
                                <div key={field.name} className={field.span ? 'md:col-span-2' : ''}>
                                    <Input {...field} value={item[field.name] || ''} onChange={e => onChange(e, index)} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SectionCard;
