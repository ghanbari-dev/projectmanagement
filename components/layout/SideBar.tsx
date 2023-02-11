import {
  // GridViewTwoTone,
  // GroupTwoTone,
  // KeyboardDoubleArrowLeftTwoTone,
  KeyboardDoubleArrowRightTwoTone,
  // ListAltTwoTone,
  // SettingsTwoTone,
  // SmsTwoTone,
} from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SideBtn from "../SideBtn";
import TodoSideBar from "../todo/TodoSideBar";

import logo from "../../public/icons/logo.svg";
import twoLeft from "../../public/icons/two-left.svg";

import homeIcon from "../../public/icons/home.svg";
import messageIcon from "../../public/icons/message.svg";
import membersIcon from "../../public/icons/profile-2user.svg";
import tasksIcon from "../../public/icons/task-square.svg";
import settingsIcon from "../../public/icons/setting-2.svg";

const SideBar = () => {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  return (
    <aside
      className={
        "flex-shrink-0 bg-white overflow-y-auto border-r-2 " +
        (open ? "w-[252.5px]" : "w-20")
      }
    >
      <div
        className={
          "w-full flex mt-[30px] mb-8 px-6 items-center " +
          (open ? "justify-between" : "justify-center")
        }
      >
        <div className="flex gap-2">
          <Image src={logo} alt="logo" />
          <h1 className="text-xl leading-6 font-semibold text-black">
            Project M.
          </h1>
        </div>

        {open ? (
          <Image src={twoLeft} alt="icon" />
        ) : (
          <IconButton
            className="border h-6 w-6 p-0"
            size="small"
            //color="inherit"
            onClick={() => setOpen((prev) => !prev)}
          >
            <KeyboardDoubleArrowRightTwoTone />
          </IconButton>
        )}
      </div>
      <Divider />
      {open && (
        <div className="flex flex-col gap-[25px] mx-6 my-[30px]">
          <SideBtn title="">
            {/* <GridViewTwoTone /> */}
            <Image src={homeIcon} alt="icon" />
          </SideBtn>

          <SideBtn title="messages">
            {/* <SmsTwoTone /> */}
            <Image src={messageIcon} alt="icon" />
          </SideBtn>

          <SideBtn title="tasks">
            {/* <ListAltTwoTone /> */}
            <Image src={tasksIcon} alt="icon" />
          </SideBtn>

          <div className="mt-[2px]">
            <SideBtn title="members">
              {/* <GroupTwoTone /> */}
              <Image src={membersIcon} alt="icon" />
            </SideBtn>
          </div>

          <SideBtn title="settings">
            {/* <SettingsTwoTone /> */}
            <Image src={settingsIcon} alt="icon" />
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
        router.route.replace("/", "") === "") && <TodoSideBar open={open} />}
    </aside>
  );
};

export default SideBar;
