import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  description,
  center = true,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'space-y-3 mb-12',
        center && 'text-center mx-auto max-w-3xl',
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
