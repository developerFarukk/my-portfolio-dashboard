

"use client"

import * as React from "react"
import {
    AppWindow,
    Book,
    Brain,
    Home,
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
        name: "OMAR FARUK",
        email: "web.omarfaruk.dev@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "MY DASHBOARD",
            logo: Home,
            plan: "OMAR FARUK",
            isActive: true,
        },
    ],
    navMain: [
        {
            title: "Projects Managments",
            icon: AppWindow,
            isActive: true,
            items: [
                {
                    title: "Add Project",
                    url: "/dashboard/addproject",
                },
                {
                    title: "All Projects",
                    url: "/dashboard/allprojects",
                },
            ],
        },
        {
            title: "Blogs Managments",
            icon: Book,
            isActive: true,
            items: [
                {
                    title: "Add Blog",
                    url: "/dashboard/addblog",
                },
                {
                    title: "All Blogs",
                    url: "/dashboard/allblogs",
                },
            ],
        },
        {
            title: "Skills Managments",
            icon: Brain,
            isActive: true,
            items: [
                {
                    title: "Add Skill",
                    url: "/dashboard/addskill",
                },
                {
                    title: "All Skills",
                    url: "/dashboard/allakills",
                },
            ],
        },
        {
            title: "Settings",
            icon: Settings2,
            isActive: true,
            items: [
                {
                    title: "General",
                    url: "/dashboard",
                },
                {
                    title: "Team",
                    url: "/dashboard",
                },
                {
                    title: "Billing",
                    url: "/dashboard",
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
