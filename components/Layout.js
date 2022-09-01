import React from "react";
import Head from "next/head";
import Link from "next/link";

export const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          {title ? title + " - Born Again Thrift" : "Born Again Thrift"}
        </title>
        <meta name="description" content="Born Again Thrift E-Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-14 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="font-bold desktop:text-4xl mobile:text-lg">
                Born Again Thrift
              </a>
            </Link>
            <div className="desktop:text-xl mobile:text-sm">
              <Link href="/cart">
                <a className="p-2">Cart</a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-1 ml-3">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Born Again Thrift</p>
        </footer>
      </div>
    </>
  );
};
