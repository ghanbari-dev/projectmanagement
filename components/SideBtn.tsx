import React, { ReactNode } from "react";

type Props = { title: string; children: ReactNode };

const SideBtn = ({ title, children }: Props) => {
  return (
    <div className="flex gap-[14px] items-center">
      <div className="w-6 h-6">{children}</div>
      <div className="font-medium leading-5">{title}</div>
    </div>
  );
};

export default SideBtn;
