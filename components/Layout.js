import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

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

      
    {/* layout begins */}
      <div className="flex min-h-screen flex-col justify-between">
        <Header/>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <Footer/>
      </div>
    </>
  );
};
