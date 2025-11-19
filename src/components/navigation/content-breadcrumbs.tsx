import Link from "next/link";
import { cn } from "../../lib/utils";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

interface ContentBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function ContentBreadcrumbs({ items, className }: ContentBreadcrumbsProps) {
  if (!items?.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "text-sm text-muted-foreground flex flex-wrap items-center gap-2",
        className
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const Separator = () => (
          <span className="text-muted-foreground/60" aria-hidden="true">
            /
          </span>
        );

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-muted-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
            {!isLast && <Separator />}
          </div>
        );
      })}
    </nav>
  );
}
