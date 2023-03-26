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
      <div className="flex relative">
        {activeMenu ? (
          <div className="w-72 fixed sidebar bg-gray-200 z-[1]">
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
          <div className="fixed md:static w-full bg-gray-100 z-[0]">
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
