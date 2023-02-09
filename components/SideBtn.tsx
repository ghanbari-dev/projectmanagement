import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

type Props = { title: string; children: ReactNode };

const SideBtn = ({ title, children }: Props) => {
  const router = useRouter();

  console.log(router.route.split("/"));

  return (
    <Link
      href={`/${title}`}
      className={
        "flex gap-[14px] items-center rounded-md" +
        (router.route.split("/")[1] === title ? " text-sky-500" : "")
      }
    >
      <div className="w-6 h-6">{children}</div>
      <div className="font-medium leading-5">{title}</div>
    </Link>
  );
};

export default SideBtn;
