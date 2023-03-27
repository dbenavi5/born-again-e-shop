import { TbMenuOrder } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdStorefront } from "react-icons/md";

export const sidebarLinks = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        icon: <MdOutlineDashboard />,
        link: "admin/dashboard",
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        name: "Transactions",
        icon: <TbMenuOrder/>,
        link:'admin/orders'
      },
      {
        name: "products",
        icon: <BiPurchaseTag />,
        link: "admin/products",
      },
      {
        name: "users",
        icon: <HiOutlineUserGroup />,
        link: "admin/users",
      },
    ],
  },
  {
    title: 'Go To',
    links:[
      {
        name: 'store',
        icon: <MdStorefront/>,
        link: "",
      }
    ]
  }
];
