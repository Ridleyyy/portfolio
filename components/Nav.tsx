"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Clothes", href: "/clothes" },
  { label: "Music", href: "/music" },
  { label: "Interior", href: "/interior" },
  { label: "Tech", href: "/tech" },
  { label: "Fonts", href: "/fonts" },
  { label: "Colours", href: "/colours" },
  { label: "Blog", href: "/blog" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-8 py-6 font-serif">
      <ul className="flex flex-wrap gap-6 text-sm text-neutral-500">
        {tabs.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={`transition-colors hover:text-neutral-900 ${
                pathname === href
                  ? "text-neutral-900 underline underline-offset-4"
                  : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <a
        href="https://www.linkedin.com/in/william-ridley-smith/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
      >
        LinkedIn ↗
      </a>
    </nav>
  );
}
