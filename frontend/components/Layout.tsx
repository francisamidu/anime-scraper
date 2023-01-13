import Head from "next/head";
import React, { PropsWithChildren } from "react";
import { Footer, Navbar } from ".";
import shared from "../shared.json";
import { LayoutProps } from "../types";
const { name, description } = shared;

const Layout = ({ children, loggedIn, page }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${page} - ${name}`}</title>
        <meta name="title" content={`${page} | ${name}`}></meta>
        <meta name="description" content={description}></meta>
      </Head>
      <main className="flex flex-col justify-between min-h-screen">
        <Navbar loggedIn={loggedIn} />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
