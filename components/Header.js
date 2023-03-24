import React, { useContext, useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Store } from "../utils/Store";
import { Menu } from "@headlessui/react";
// import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import { Badge } from "@mui/material";

export default function Header() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const { status, data: session } = useSession();

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((acc, i) => acc + i.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header>
      <nav className="flex h-14 items-center px-4 justify-between shadow-md">
        <Link href="/">
          <a className="text-lg md:text-4xl font-black text-indigo-600">
            Born Again Style
          </a>
        </Link>
        <div className="text-sm md:text-xl">
          <Link href="/cart">
            <a className="p-2">
              Cart
              {cartItemsCount > 0 && (
                <Badge
                  badgeContent={cartItemsCount}
                  invisible={cartItemsCount === 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      right: 5,
                      top: -15,
                      padding: "0 4px",
                      height: "20px",
                      minWidth: "20px",
                      backgroundColor: "#f43f5e",
                      color: "#FFFFFF",
                    },
                  }}
                />
              )}
            </a>
          </Link>
          {status === "loading" ? (
            "Loading..."
          ) : session?.user ? (
            <Menu as="div" className="relative inline-block z-10">
              <Menu.Button className="text-indigo-600">
                {session.user.name}
              </Menu.Button>
              <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                <Menu.Item>
                  <Link href="/profile">
                    <a className="dropdown-link">Profile</a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/order-history">
                    <a className="dropdown-link">Order History</a>
                  </Link>
                </Menu.Item>
                {session.user.isAdmin && (
                  <Menu.Item>
                    <Link href="/admin/dashboard">
                      <a className="dropdown-link">Admin Dashboard</a>
                    </Link>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <a
                    className="dropdown-link last:text-indigo-500"
                    href="#"
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/login">
              <a className="p-2 hover:text-indigo-500">Login</a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
