"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    // <SidebarGroup>
    //   <SidebarGroupLabel>Platform</SidebarGroupLabel>
    //   <SidebarMenu>
    //     {items.map((item) => (
    //       <Collapsible
    //         key={item.title}
    //         asChild
    //         defaultOpen={item.isActive}
    //         className="group/collapsible"
    //       >
    //         <SidebarMenuItem>
    //           <CollapsibleTrigger asChild>
    //             <SidebarMenuButton
    //               //   className={`${
    //               //     pathname &&
    //               //     " bg-sidebar-accent text-sidebar-accent-foreground"
    //               //   }`}
    //             //   className={
    //             //     isGroupActive
    //             //       ? "bg-sidebar-accent text-sidebar-accent-foreground"
    //             //       : ""
    //             //   }
    //               tooltip={item.title}
    //             >
    //               {item.icon && <item.icon />}
    //               <span>{item.title}</span>
    //               <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
    //             </SidebarMenuButton>
    //           </CollapsibleTrigger>
    //           <CollapsibleContent>
    //             <SidebarMenuSub>
    //               {item.items?.map((subItem) => (
    //                 <SidebarMenuSubItem key={subItem.title}>
    //                   <SidebarMenuSubButton asChild>
    //                     <Link href={subItem.url}>
    //                       <span>{subItem.title}</span>
    //                     </Link>
    //                   </SidebarMenuSubButton>
    //                 </SidebarMenuSubItem>
    //               ))}
    //             </SidebarMenuSub>
    //           </CollapsibleContent>
    //         </SidebarMenuItem>
    //       </Collapsible>
    //     ))}
    //   </SidebarMenu>
    // </SidebarGroup>

    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          // ✅ group active if any sub url matches current pathname
          const isGroupActive = item.items?.some((subItem) =>
            pathname.startsWith(subItem.url),
          );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive || isGroupActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {/* Group button */}
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={
                      isGroupActive
                        ? "bg-slate-200 dark:bg-sidebar-accent text-sidebar-accent-foreground"
                        : ""
                    }
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {/* Sub menu */}
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubActive =
                        pathname === subItem.url ||
                        pathname.startsWith(subItem.url + "/");

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={
                              isSubActive
                                ? "bg-sidebar-accent/50 text-sidebar-accent-foreground"
                                : ""
                            }
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
