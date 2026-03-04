"use client";

// import { NavSecondary } from "@/components/nav-secondary";
// import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@streeio-core/ui/components/sidebar";
import { Briefcase, Command, LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import { NavProjects } from "./nav-project";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Users",
      url: "/users",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/users",
        },
        {
          title: "Roles",
          url: "/users/roles",
        },
        {
          title: "Permissions",
          url: "/users/permissions",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Clients",
      url: "/clients",
      icon: Briefcase,
    },
    // {
    //   name: "Stats",
    //   url: "/stats",
    //   icon: PieChart,
    // },
    // {
    //   name: "Reports",
    //   url: "/reports",
    //   icon: FileText,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={
                <Link className="flex items-center gap-2" href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-2 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      Steerio - Internal
                    </span>
                  </div>
                </Link>
              }
              size="lg"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
        {/* <NavSecondary className="mt-auto" items={data.navSecondary} /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
