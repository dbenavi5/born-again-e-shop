import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine } from "react-icons/ri";
import { FaStore } from "react-icons/fa";

export const sidebarLinks = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        icon: <FiShoppingBag />,
        link: "admin/dashboard",
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        name: "orders",
        icon: <AiOutlineShoppingCart />,
        link:'admin/orders'
      },
      {
        name: "products",
        icon: <IoMdContacts />,
        link: "admin/products",
      },
      {
        name: "customers",
        icon: <RiContactsLine />,
        link: "admin/users",
      },
    ],
  },
  {
    title: 'Go To',
    links:[
      {
        name: 'store',
        icon: <FaStore/>,
        link: "",
      }
    ]
  }
];
