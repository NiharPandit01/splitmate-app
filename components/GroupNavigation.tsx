"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type GroupNavigationProps = {
  groupId: string;
};

export default function GroupNavigation({
  groupId,
}: GroupNavigationProps) {
  const pathname = usePathname();

  const links = [
    {
      name: "Overview",
      href: `/groups/${groupId}`,
    },
    {
      name: "Expenses",
      href: `/groups/${groupId}/expenses`,
    },
    {
      name: "Members",
      href: `/groups/${groupId}/members`,
    },
    {
      name: "Settings",
      href: `/groups/${groupId}/settings`,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginBottom: "24px",
        flexWrap: "wrap",
      }}
    >
      {links.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              textDecoration: "none",
              border: "1px solid #ccc",
              backgroundColor: active ? "#0070f3" : "#ffffff",
              color: active ? "#ffffff" : "#000000",
              fontWeight: 600,
            }}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}