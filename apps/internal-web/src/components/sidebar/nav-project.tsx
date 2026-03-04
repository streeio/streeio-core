"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@streeio-core/ui/components/sidebar";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const isActive = pathname === item.url;
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                isActive={isActive}
                render={
                  <Link
                    className="group/item relative flex w-full items-center gap-2 overflow-hidden"
                    href={item.url as React.ComponentProps<typeof Link>["href"]}
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.05 : 1,
                        color: isActive ? "var(--primary)" : "currentColor",
                      }}
                      className="flex size-4 shrink-0 items-center justify-center"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <item.icon className="size-full transition-colors group-hover/item:text-primary" />
                    </motion.div>
                    <motion.span
                      animate={{ x: isActive ? 2 : 0 }}
                      className="truncate font-medium transition-colors group-hover/item:text-primary"
                    >
                      {item.name}
                    </motion.span>
                    {isActive && (
                      <motion.div
                        animate={{ opacity: 1 }}
                        className="pointer-events-none absolute inset-0 border-primary border-r-2 bg-primary/5"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        layoutId="active-nav-indicator"
                      />
                    )}
                  </Link>
                }
                tooltip={item.name}
              />
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
