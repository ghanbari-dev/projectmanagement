import {
  GridViewTwoTone,
  GroupTwoTone,
  KeyboardDoubleArrowLeftTwoTone,
  KeyboardDoubleArrowRightTwoTone,
  ListAltTwoTone,
  SettingsTwoTone,
  SmsTwoTone,
} from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SideBtn from "../SideBtn";
import TodoSideBar from "../todo/TodoSideBar";

const SideBar = () => {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  return (
    <aside
      className={
        "flex-shrink-0 bg-white overflow-auto border-r-2 " +
        (open ? "w-[250px]" : "w-20")
      }
    >
      <div
        className={
          "w-full flex mt-[30px] mb-8 px-6 items-center " +
          (open ? "justify-between" : "justify-center")
        }
      >
        <div className="flex gap-2">
          <Image src="/Group 7.svg" alt="logo" width={24} height={24} />
          <h1 className="text-xl leading-6 font-semibold text-black">
            Project M.
          </h1>
        </div>
        <IconButton
          className="border h-6 w-6 p-0"
          size="small"
          //color="inherit"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <KeyboardDoubleArrowLeftTwoTone />
          ) : (
            <KeyboardDoubleArrowRightTwoTone />
          )}
        </IconButton>
      </div>
      <Divider />
      {open && (
        <div className="flex flex-col gap-6 mx-6 my-[30px]">
          <SideBtn title="">
            <GridViewTwoTone />
          </SideBtn>

          <SideBtn title="messages">
            <SmsTwoTone />
          </SideBtn>

          <SideBtn title="tasks">
            <ListAltTwoTone />
          </SideBtn>

          <SideBtn title="members">
            <GroupTwoTone />
          </SideBtn>

          <SideBtn title="settings">
            <SettingsTwoTone />
          </SideBtn>

          {/* <div className="capitalize">my boards</div>
          <div className="border-2 rounded-xl">
            <IconButton
              color="inherit"
              size="small"
              onClick={() => setAdd((prev) => !prev)}
            >
              <AddTwoTone />
            </IconButton>
          </div> */}
        </div>
      )}
      <div className="mx-3">
        <Divider />
      </div>

      {(router.route.replace("/", "") === "tasks" ||
        router.route.replace("/", "") === "") && (
        <TodoSideBar open={open} />
      )}
    </aside>
  );
};

export default SideBar;
