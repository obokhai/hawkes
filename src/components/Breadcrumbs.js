"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const segments = pathname.split("/").filter(Boolean);

  // Get property and name from search params
  const propertyId = searchParams.get("property");
  const propertyName = searchParams.get("name");
  const tab = searchParams.get("tab");

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      <Link href="/" className="hover:underline">Home</Link>
      {segments.map((segment, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        // If this segment is 'dashboard' and tab exists, use tab as label
        const isDashboard = segment.toLowerCase() === "dashboard";
        const label = isDashboard && tab
          ? tab
          : segment.charAt(0).toUpperCase() + segment.slice(1);

        // If last segment and property is present, show only the property name
        if (
          idx === segments.length - 1 &&
          propertyId &&
          propertyName
        ) {
          return (
            <span key={href} className="flex items-center">
              <span className="mx-2">/</span>
              <span className="font-semibold text-gray-700">{propertyName}</span>
            </span>
          );
        }

        // Normal breadcrumb rendering
        return (
          <span key={href} className="flex items-center">
            <span className="mx-2">/</span>
            {idx === segments.length - 1 ? (
              <span className="font-semibold text-gray-700">{label}</span>
            ) : (
              <Link href={href} className="hover:underline">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}