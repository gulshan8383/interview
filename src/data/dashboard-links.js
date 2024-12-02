import { ACCOUNT_TYPE } from "../ultilites/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },

  {
    id: 3,
    name: "My Chats",
    path: "/dashboard/my-chat",
    icon: "VscVm",
  },


 
 
  {
    id: 7,
    name: "Dashboard",
    path: "/dashboard/admin",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscDashboard",
  },
 

  {
    id: 9,
    name: "Users",
    path: "/dashboard/users-admin",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscMortarBoard",
  },


];
