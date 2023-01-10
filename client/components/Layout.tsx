import React, { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden flex flex-col">
      <header className="h-12 flex-shrink-0 bg-slate-900">header</header>
      <div className="flex-grow flex overflow-hidden">
        <aside className="bg-sky-900 w-1/4 overflow-auto">side</aside>
        <main className="bg-indigo-300 flex-grow overflow-auto">
          {children}
        </main>
      </div>
      <footer className="h-12 bg-slate-900">footer</footer>
    </div>
  );
};

export default Layout;
