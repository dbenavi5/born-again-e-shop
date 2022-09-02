import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex h-14 items-center px-4 justify-between shadow-md">
        <Link href="/">
          <a className="text-lg tablet:text-4xl font-black">Born Again Thrift</a>
        </Link>
        <div className="text-sm tablet:text-xl">
          <Link href="/cart">
            <a className="p-2 font-extrabold">Cart</a>
          </Link>
          <Link href="/login">
            <a className="p-2 font-extrabold">Login</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
