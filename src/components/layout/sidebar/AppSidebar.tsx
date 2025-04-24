
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { SidebarNav } from "./SidebarNav"
import { UserProfile, UserProfileMenu } from "./UserProfile"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <UserProfile />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter>
        <UserProfileMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
