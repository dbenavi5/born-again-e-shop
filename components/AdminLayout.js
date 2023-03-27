import Head from "next/head";
import React from "react";
import { useStateContext } from "../context/ContextProvider";
import AdminHeader from "./admin/AdminHeader";
import AdminSidebar from "./admin/AdminSidebar";

export default function AdminLayout({ title, children }) {
  const { activeMenu } = useStateContext();
  return (
    <>
      <Head>
        <title>
          {title ? title + " - Born Again Dashboard" : "Born Again Dashboard"}
        </title>
        <meta name="description" content="Born Again Thrift Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* adminlayout begins */}
      <div className="flex relative bg-slate-200 dark:bg-zinc-900 dark:text-zinc-300 text-slate-700">
        {activeMenu ? (
          <div className="w-72 fixed sidebar bg-slate-200 dark:bg-zinc-900 z-[1] border-r-[1px] border-zinc-600">
            <AdminSidebar />
          </div>
        ) : (
          <div className="w-0">
            <AdminSidebar />
          </div>
        )}
        <div
          className={`min-h-screen w-full ${
            activeMenu ? "md:ml-72" : "flex-2"
          }`}
        >
          <div className="fixed md:static w-full dark:bg-zinc-900 bg-slate-200 z-[0] border-b-[1px] border-zinc-600">
            <AdminHeader />
          </div>
          <div>
            <main className='my-24 md:my-4 w-full'>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
