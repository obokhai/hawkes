"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const propertyName = searchParams.get("name");
  const tab = searchParams.get("tab");

  // For /dashboard?tab=... show: < {TabName}
  if (
    pathname === "/dashboard" &&
    tab
  ) {
    return (
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <span className="font-semibold text-gray-700">
         <a href='/dashboard'> &lt; </a>  {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </span>
      </nav>
    );
  }

  // For /dashboard?name=... show: < {propertyName}
  if (
    pathname === "/dashboard" &&
    propertyName
  ) {
    return (
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <span className="font-semibold text-gray-700">
          &lt; {propertyName}
        </span>
      </nav>
    );
  }
    if (
    pathname === "/dashboard"

  ) {
    return (
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <span className="font-semibold text-gray-700">
          Dashboard
        </span>
      </nav>
    );
  }

  // For other pages, show the breadcrumb links, using tab as label if present
  const segments = pathname.split("/").filter(Boolean);
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      <Link href="/dashboard" className="hover:underline">Home</Link>
      {segments.map((segment, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        const isLast = idx === segments.length - 1;
        const label = isLast && tab
          ? tab.charAt(0).toUpperCase() + tab.slice(1)
          : segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <span key={href} className="flex items-center">
            <span className="mx-2">/</span>
            {isLast ? (
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