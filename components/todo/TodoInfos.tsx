import { Avatar, AvatarGroup, Button, FormControl, InputLabel, Select } from "@mui/material";
import Image from "next/image";
import React from "react";



import linkIcon from "../../public/icons/link.svg";
import editIcon from "../../public/icons/edit.svg";
import addIcon from "../../public/icons/add-square.svg";
import calendarIcon from "../../public/icons/calendar.svg";
import filterIcon from "../../public/icons/filter.svg";
import membersIcon from "../../public/icons/profile-2user.svg";
import groupIcon from "../../public/icons/Group 611.svg";
import sortIcon from "../../public/icons/Group 612.svg";
import { boardType } from "../../types/board";


type Props = {state: boardType | undefined};

const TodoInfos = ({state}: Props) => {
  return (
    <div className="mt-10 ml-[48.5px] mr-[46px] flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-[46px] leading-[56px] text-[#0D062D] font-semibold tracking-[0.035em]">
            {state?.title}
          </div>
          <div className="ml-[19.5px] mt-[6px] flex items-center gap-3">
            {/* <EditTwoTone sx={{ height: 30, width: 30 }} color="primary" />
            <LinkTwoTone sx={{ height: 30, width: 30 }} color="primary" /> */}
            <Image src={editIcon} alt="icon" />
            <Image src={linkIcon} alt="icon" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-[6px]">
            {/* <AddTwoTone
              color="primary"
              sx={{ height: "18px", width: "18px" }}
            /> */}
            <Image src={addIcon} height={18} alt="icon" />
            <div className="leading-5 font-medium text-[#5030E5]">Invite</div>
          </div>
          <AvatarGroup
            max={5}
            componentsProps={{
              additionalAvatar: {
                sx: {
                  height: "34px",
                  width: "34px",
                  background: "#F4D7DA",
                  color: "#D25B68",
                  fontSize: "15px",
                },
              },
            }}
          >
            {["A", "B", "C", "D", "E", "F"].map((a) => (
              <Avatar key={a} sx={{ height: "34px", width: "34px" }}>
                {a}
              </Avatar>
            ))}
          </AvatarGroup>
        </div>
      </div>

      <div className="pb-[2px] flex justify-between items-center">
        <div className="flex justify-between items-center gap-3">
          <FormControl>
            <InputLabel sx={{ top: -6 }} htmlFor="filter">
              <div className="flex items-center">
                {/* <FilterAltTwoTone
                  sx={{ height: 16, width: 16, marginRight: "6px" }}
                /> */}
                <Image src={filterIcon} alt="icon" />
                <div className="ml-2 leading-5 font-medium">Filter</div>
              </div>
            </InputLabel>
            <Select
              sx={{ padding: 0 }}
              id="filter"
              className="w-[122px] h-10"
              label="filter"
            />
          </FormControl>
          <FormControl>
            <InputLabel sx={{ top: -6 }} htmlFor="today">
              <div className="flex items-center">
                {/* <CalendarTodayTwoTone
                  sx={{ height: 16, width: 16, marginRight: "6px" }}
                /> */}
                <Image src={calendarIcon} alt="icon" />
                <div className="ml-2 leading-5 font-medium">Today</div>
              </div>
            </InputLabel>
            <Select
              sx={{ padding: 0 }}
              id="today"
              className="w-[122px] h-10"
              label="today"
            />
          </FormControl>
        </div>
        <div className="flex justify-between items-center gap-5">
          <Button color="inherit" variant="outlined" className="w-[97px] h-10">
            {/* <GroupTwoTone sx={{ height: 16, width: 16 }} /> */}
            <Image src={membersIcon} height={16} alt="icon" />
            <span className="ml-[6px] text-base left-[19px] font-medium capitalize">
              Share
            </span>
          </Button>
          <div className="h-[28px] w-[1px] bg-[#787486]" />
          <Image src={sortIcon} alt="btn" height={40} width={40} />
          {/* <GridViewTwoTone /> */}
          <Image className="ml-[2px]" src={groupIcon} alt="btn" height={21} />
        </div>
      </div>
    </div>
  );
};

export default TodoInfos;
