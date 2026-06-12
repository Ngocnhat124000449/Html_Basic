"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  // Trên mobile ẩn "Tổng quan" (logo đã dẫn về trang chủ) để các link còn lại vừa màn 375px
  { href: "/", label: "Tổng quan", mobileHidden: true },
  { href: "/tags", label: "Thẻ" },
  { href: "/study", label: "Học" },
  { href: "/reflex", label: "Phản xạ" },
  { href: "/practice", label: "Tổng hợp" },
  { href: "/css", label: "CSS β" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="no-scrollbar flex items-center gap-1 overflow-x-auto">
      {LINKS.map(({ href, label, mobileHidden }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`whitespace-nowrap rounded-full px-2 py-1.5 text-sm font-medium transition-colors sm:px-3 ${
              mobileHidden ? "hidden sm:inline-block" : ""
            } ${
              active
                ? "bg-flame-500 text-white shadow-sm"
                : "text-ink/70 hover:bg-flame-100 hover:text-flame-700"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
