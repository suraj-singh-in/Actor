import { LayoutDashboard, UserPlus, UserRoundCog, Users } from "lucide-react";

import { LoginPageConfig, NavigationItemType } from "./types";

export const navItem: NavigationItemType[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    title: "User",
    icon: Users,
    href: "/dashboard/user",
    color: "text-green-500",
  },
  {
    title: "Roles",
    icon: UserRoundCog,
    href: "/dashboard/roles",
    color: "text-sky-500",
  },
  {
    title: "Permissions",
    icon: UserPlus,
    href: "/dashboard/permissions",
    color: "text-sky-500",
  },
];

export const LOGIN_PAGE_CONFIG: LoginPageConfig = {
  title: "ACTOR",
  description: "A simplified to mock your APIs",
  formFieldConfigs: [
    {
      name: "userName",
      type: "text",
      placeholder: "Enter your user name",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ],
  submitButtonText: "Login",
};
