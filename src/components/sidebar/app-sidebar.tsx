

"use client"

import * as React from "react"
import {
    AppWindow,
    Book,
    Brain,
    GalleryVerticalEnd,
    Settings2,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "MY DASHBOARD",
            logo: GalleryVerticalEnd,
            plan: "OMAR FARUK",
            isActive: true,
        },
    ],
    navMain: [
        {
            title: "Projects",
            icon: AppWindow,
            items: [
                {
                    title: "Add Project",
                    url: "#",
                },
                {
                    title: "All Projects",
                    url: "#",
                },
            ],
        },
        {
            title: "Blogs",
            icon: Book,
            items: [
                {
                    title: "Add Blog",
                    url: "#",
                },
                {
                    title: "All Blogs",
                    url: "#",
                },
            ],
        },
        {
            title: "Skills",
            icon: Brain,
            items: [
                {
                    title: "Add Skill",
                    url: "#",
                },
                {
                    title: "All Skills",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
