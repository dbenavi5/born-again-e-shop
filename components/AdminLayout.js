import Head from "next/head";
import React from "react";
import AdminFooter from "./admin/AdminFooter";
import AdminHeader from "./admin/AdminHeader";
import AdminSidebar from "./admin/AdminSidebar";

export default function AdminLayout({ title, children }) {
  const activeMenu = true;
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
          <div className="w-72 fixed sidebar bg-white">
            <AdminSidebar />
          </div>
        ) : (
          <div className="w-0">
            <AdminSidebar />
          </div>
        )}
        <div
          className={`dark:bg-main-bg min-h-screen w-full ${
            activeMenu ? "md:ml-72 " : "flex-2"
          }`}
        >
          <div className="fixed md:static navbar w-full">
            <AdminHeader />
            <div>
              <main className="">{children}</main>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
}
