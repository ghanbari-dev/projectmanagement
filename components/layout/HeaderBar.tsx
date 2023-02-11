import React from "react";
import Image from "next/image";
import { Avatar, InputBase } from "@mui/material";

import searchIcon from "../../public/icons/search-normal.svg"
import calendarIcon from "../../public/icons/calendar-2.svg"
import notificationIcon from "../../public/icons/notification.svg"
import mqIcon from "../../public/icons/message-question.svg"
import downIcon from "../../public/icons/arrow-down.svg"

const HeaderBar = () => {
  return (
    <header className="h-[86px] flex-shrink-0 flex items-center justify-between pb-[2px]">
      <div
        className="flex items-center rounded-md w-[417px] h-[44px] ml-12 pb-[2px] pl-[16.8px]" //
      >
        {/* <SearchTwoTone className="ml-4" /> */}
        <Image src={searchIcon} alt="icon" />
        <InputBase className="ml-4" placeholder="Search for anything..." />
      </div>

      <div className="flex items-center mr-[46px]">
        <div className="flex items-center gap-6 mr-[50px]">
          {/* <EventNoteTwoTone /> */}
          <Image src={calendarIcon} alt="icon" />

          {/* <ContactSupportTwoTone /> */}
          <Image src={mqIcon} alt="icon" />

          {/* <Badge badgeContent={4} color="primary">
            <NotificationsTwoTone />
          </Badge> */}
          <Image src={notificationIcon} alt="icon" />
        </div>
        <div className="flex items-center">
          <div className="mr-[22px] h-[40px] flex flex-col justify-between items-end tracking-wide">
            <div className="text-[#0D062D] leading-[19px]">Anima Agrawal </div>
            <div className="text-sm leading-[17px] font-normal">U.P, India</div>
          </div>
          <Avatar className="mb-[2px] mr-[10px]" sx={{ width: 38, height: 38 }}>M</Avatar>
          {/* <KeyboardArrowDownTwoTone
            className="ml-[10px]"
            sx={{ width: 18, height: 18 }}
          /> */}
          <Image src={downIcon} alt="icon" />
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;

