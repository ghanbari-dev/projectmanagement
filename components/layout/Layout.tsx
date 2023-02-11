import { Divider } from "@mui/material";
import Head from "next/head";
import React, { ReactNode } from "react";
import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden text-[#787486] tracking-[0.04em]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen flex">
        <SideBar />
        <div className="flex-grow h-screen flex flex-col overflow-hidden">
          <HeaderBar />
          <Divider />
          <main className="flex-grow w-full h-full overflow-hidden">
              {children}
          </main>
        </div>
      </div>
      {/* <footer className="h-12 bg-slate-900">footer</footer> */}
    </div>
  );
};

export default Layout;
