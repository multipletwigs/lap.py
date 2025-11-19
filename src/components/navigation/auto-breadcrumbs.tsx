"use client";

import { usePathname } from "next/navigation";
import { ContentBreadcrumbs } from "./content-breadcrumbs";
import NavBarCopy from "./labels";

interface AutoBreadcrumbsProps {
  className?: string;
  customTitle?: string;
  customDescription?: string;
}

export function AutoBreadcrumbs({ 
  className, 
  customTitle,
  customDescription 
}: AutoBreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Don't show breadcrumbs on home page
  if (segments.length === 0) return null;

  const breadcrumbItems: Array<{ href?: string; label: string }> = [
    { href: "/", label: "Home" }
  ];

  // Build breadcrumb trail
  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    // Check if this segment matches a known nav item
    const navItem = Object.values(NavBarCopy).find(
      (item) => item.link?.href === `/${segment}`
    );

    if (navItem && navItem.link) {
      breadcrumbItems.push({
        ...(isLast ? {} : { href }),
        label: navItem.link.text,
      });
    } else if (isLast && customTitle) {
      // Use custom title for the last segment if provided
      breadcrumbItems.push({
        label: customTitle,
      });
    } else {
      // Fallback: capitalize the segment
      breadcrumbItems.push({
        ...(isLast ? {} : { href }),
        label: segment.split("-").map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(" "),
      });
    }
  });

  return (
    <div className="space-y-2">
      <ContentBreadcrumbs items={breadcrumbItems} className={className} />
      {customDescription && (
        <p className="text-muted-foreground/90 text-sm leading-relaxed max-w-2xl">
          {customDescription}
        </p>
      )}
    </div>
  );
}
