import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { Store } from "../utils/Store";

export default function Header() {

  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((acc, i) => acc + i.quantity, 0));
  }, [cart.cartItems])
  
  return (
    <header>
      <nav className="flex h-14 items-center px-4 justify-between shadow-md">
        <Link href="/">
          <a className="text-lg tablet:text-4xl font-black">Born Again Thrift</a>
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
          <Link href="/login">
            <a className="p-2">Login</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
