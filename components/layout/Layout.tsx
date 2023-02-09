import { Divider } from '@mui/material'
import Head from 'next/head'
import React, { ReactNode } from 'react'
import HeaderBar from './HeaderBar'
import SideBar from './SideBar'

type Props = {children : ReactNode}

const Layout = ({children}: Props) => {
  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden flex flex-col text-[#787486]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-grow flex overflow-hidden">
        <SideBar />
        <div className="flex-grow overflow-auto">
          <HeaderBar />
          <Divider />
          <main className="px-[42px] py-12">
            {children}
          </main>
        </div>
      </div>
      {/* <footer className="h-12 bg-slate-900">footer</footer> */}
    </div>
  )
}

export default Layout