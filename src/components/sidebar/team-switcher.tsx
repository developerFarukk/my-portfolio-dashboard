

"use client"

import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
    teams,
    activeTeamName,
    onTeamChange
}: {
    teams: {
        name: string
        logo: React.ElementType
        plan: string
    }[]
    activeTeamName?: string
    onTeamChange?: (teamName: string) => void
}) {
    const activeTeam = activeTeamName
        ? teams.find(team => team.name === activeTeamName) ?? teams[0]
        : teams[0]

    if (!activeTeam) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-green-200 hover:bg-green-300"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <activeTeam.logo className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeTeam.name}
                                </span>
                                <span className="truncate text-xs">{activeTeam.plan}</span>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    {onTeamChange && (
                        <DropdownMenuContent align="start" side="right" className="w-48">
                            {teams.map((team) => (
                                <DropdownMenuItem
                                    key={team.name}
                                    onClick={() => onTeamChange(team.name)}
                                    className="cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <team.logo className="size-4" />
                                        <span>{team.name}</span>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    )}
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}