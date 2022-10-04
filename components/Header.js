import React, { useContext, useState, useEffect } from "react";
import { signOut, useSession } from 'next-auth/react';
import Link from "next/link";
import { Store } from "../utils/Store";
import { Menu } from '@headlessui/react';
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";

export default function Header() {

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const { status, data: session } = useSession();

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((acc, i) => acc + i.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({type: 'CART_RESET'});
    signOut({ callbackUrl: '/login' });
  }
  
  return (
    <header>
      <nav className="flex h-14 items-center px-4 justify-between shadow-md">
        <Link href="/">
          <a className="text-lg tablet:text-4xl font-black">
            Born Again Thrift
          </a>
        </Link>
        <div className="text-sm tablet:text-xl">
          <Link href="/cart">
            <a className="p-2 ">
              Cart
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2.5 py-1 text-xs text-white">
                  {/* sum of all quantities in cart */}
                  {cartItemsCount}
                </span>
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
                  <DropdownLink className="dropdown-link" href="/profile">
                    Profile
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/order-history">
                    Order History
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <a
                    className="dropdown-link"
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
              <a className="p-2">Login</a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
