// import {
//   AddTwoTone,
//   CalendarTodayTwoTone,
//   EditTwoTone,
//   FilterAltTwoTone,
//   GridViewTwoTone,
//   GroupTwoTone,
//   LinkTwoTone,
// } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBoard,
  selectUID,
  addColumn,
  updateOrders,
} from "../../redux/stateSlice";
import { columnType, taskType } from "../../types/board";
import Columns from "./Columns";

import StrictModeDroppable from "./StrictModeDroppable";

import linkIcon from "../../public/icons/link.svg";
import editIcon from "../../public/icons/edit.svg";
import addIcon from "../../public/icons/add-square.svg";
import calendarIcon from "../../public/icons/calendar.svg";
import filterIcon from "../../public/icons/filter.svg";
import membersIcon from "../../public/icons/profile-2user.svg";
import groupIcon from "../../public/icons/Group 611.svg";
import sortIcon from "../../public/icons/Group 612.svg";

const TodoTemplate = () => {
  const dispatch = useDispatch();
  const uid = useSelector(selectUID);
  const state = useSelector(selectBoard);

  const [addColumnName, setAddColumnName] = useState("");

  const addColumns = async (title: string) => {
    dispatch(addColumn({ title, userID: uid }));
  };

  const onDragEnd = (res: DropResult) => {
    const { destination, source, type } = res;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (state === undefined) return;

    if (type === "column") {
      const newCols: columnType[] = [];
      state.column.forEach((col) => {
        newCols.push({ ...col });
      });
      for (let _ind = 0; _ind < newCols.length; _ind++) {
        if (source.index < destination.index) {
          if (_ind < source.index || _ind > destination.index) {
            newCols[_ind].order = newCols.length - _ind;
          } else if (_ind != source.index) {
            newCols[_ind].order = newCols.length - _ind + 1;
          } else {
            newCols[_ind].order = newCols.length - destination.index;
          }
        } else {
          if (_ind > source.index || _ind < destination.index) {
            newCols[_ind].order = newCols.length - _ind;
          } else if (_ind != source.index) {
            newCols[_ind].order = newCols.length - _ind - 1;
          } else {
            newCols[_ind].order = newCols.length - destination.index;
          }
        }
      }
      newCols.sort((a, b) => b.order - a.order);
      // const newState = { ...state, column: newCols };
      // const newStateS: boardType[] = [];
      // boardList.forEach((b) => {
      //   if (b.id != newState.id) newStateS.push(b);
      //   else newStateS.push(newState);
      // });

      dispatch(updateOrders({ cols: newCols, userID: uid }));
      return;
    }

    if (source.droppableId == destination.droppableId) {
      const newTask: taskType[] = [];
      state.column
        ?.find((e) => e.id == source.droppableId)
        ?.task.forEach((task) => {
          newTask.push({ ...task });
        });

      for (let _ind = 0; _ind < newTask.length; _ind++) {
        if (source.index < destination.index) {
          if (_ind < source.index || _ind > destination.index) {
            newTask[_ind].order = newTask.length - _ind;
          } else if (_ind != source.index) {
            newTask[_ind].order = newTask.length - _ind + 1;
          } else {
            newTask[_ind].order = newTask.length - destination.index;
          }
        } else {
          if (_ind > source.index || _ind < destination.index) {
            newTask[_ind].order = newTask.length - _ind;
          } else if (_ind != source.index) {
            newTask[_ind].order = newTask.length - _ind - 1;
          } else {
            newTask[_ind].order = newTask.length - destination.index;
          }
        }
      }

      newTask.sort((a, b) => b.order - a.order);
      const newCols: columnType[] = [];
      state.column.forEach((col) => {
        if (col.id != source.droppableId) {
          newCols.push(col);
        } else {
          newCols.push({ ...col, task: newTask });
        }
      });
      // const newState: boardType = { ...state, column: newCols };
      // const newStateS: boardType[] = [];
      // boardList.forEach((b) => {
      //   if (b.id != newState.id) newStateS.push(b);
      //   else newStateS.push(newState);
      // });

      dispatch(updateOrders({ cols: newCols, userID: uid }));
      // updateTaskColumn(newCols);
      return;
    }

    const newTaskD: taskType[] = [];
    const tempD: taskType[] =
      state.column?.find((e) => e.id == destination.droppableId)?.task || [];
    const tempS =
      state.column?.find((e) => e.id == source.droppableId)?.task || [];

    if (tempD.length > 0) {
      tempD.forEach((task, index: number) => {
        if (index == destination.index) {
          newTaskD.push({
            ...tempS[source.index],
          });
        }
        newTaskD.push({ ...task });
      });
      if (tempD.length == destination.index) {
        newTaskD.push({
          ...tempS[source.index],
        });
      }
    } else
      newTaskD.push({
        ...tempS[source.index],
      });

    const newTaskS: taskType[] = [];
    state.column
      .find((e) => e.id == source.droppableId)
      ?.task.forEach((task, index: number) => {
        if (index != source.index) newTaskS.push({ ...task });
      });

    for (let _ind = 0; _ind < newTaskS.length - 1; _ind++) {
      newTaskS[_ind].order = newTaskS.length - _ind;
    }

    for (let _ind = 0; _ind < newTaskD.length; _ind++) {
      newTaskD[_ind].order = newTaskD.length - _ind;
    }

    newTaskS.sort((a, b) => b.order - a.order);
    newTaskD.sort((a, b) => b.order - a.order);

    const newCols: columnType[] = [];
    state.column.forEach((col) => {
      if (col.id == source.droppableId) {
        newCols.push({ ...col, task: newTaskS });
      } else if (col.id == destination.droppableId) {
        newCols.push({ ...col, task: newTaskD });
      } else newCols.push(col);
    });
    // const newState = { ...state, column: newCols };
    // const newStateS: boardType[] = [];
    // boardList.forEach((b) => {
    //   if (b.id != newState.id) newStateS.push(b);
    //   else newStateS.push(newState);
    // });

    dispatch(updateOrders({ cols: newCols, userID: uid }));
    // updateTaskColumn(newCols);
  };

  return (
    <div className="w-full h-full flex flex-col gap-10" //mx-[46px] pl-[2.5px] my-[40px] 
    >
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
            <Button
              color="inherit"
              variant="outlined"
              className="w-[97px] h-10"
            >
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

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="pl-[48.5px] flex overflow-auto">
          <div
            className="" //overflow-y-auto"
          >
            <StrictModeDroppable
              droppableId="cols"
              direction="horizontal"
              type="column"
            >
              {(provided, snapshot) => (
                <div
                  className={
                    "flex-grow flex gap-[15px] items-start h-full transition-colors ease-in-out rounded-2xl -ml-[2px]" +
                    (snapshot.isDraggingOver
                      ? " border-2 border-dashed"
                      : " border-2 border-transparent")
                  }
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {state?.column.map((col, index) => (
                    <Columns key={col.id} index={index} />
                  ))}

                  {provided.placeholder}
                  <div className="flex bg-white rounded-xl flex-shrink-0 p-2 gap-2 w-[200px]">
                    <TextField
                      className="flex-grow max-w-[80%]"
                      type="text"
                      value={addColumnName}
                      onChange={(e) => {
                        setAddColumnName(e.target.value);
                      }}
                    />
                    <Button
                      className="p-2 border"
                      variant="contained"
                      color="success"
                      onClick={() => {
                        addColumns(addColumnName);
                        setAddColumnName("");
                      }}
                    >
                      add
                    </Button>
                  </div>
                </div>
              )}
            </StrictModeDroppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TodoTemplate;
