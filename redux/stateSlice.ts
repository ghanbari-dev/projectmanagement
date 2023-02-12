import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { boardType, columnType, taskType } from "../types/board";

import initData from "../db.json";

// const initdata: StateType = initData as unknown as StateType;
export interface StateType {
  Boards: boardType[];
  boardIndex: string;
  uid: string;
}

const initialState: StateType = {
  ...initData as unknown as StateType,
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    // setUID: (state, action: PayloadAction<string>) => {
    //   state.uid = action.payload;
    // },
    setBoardID: (state, action: PayloadAction<string>) => {
      state.boardIndex = action.payload;
    },
    addBoard: (
      state,
      action: PayloadAction<{ title: string; uid: string }>
    ) => {
      const { title, uid } = action.payload;
      if (!title || !uid) {
        console.log("title is null");
      }
      const data: boardType = {
        id: "b_" + new Date().toJSON(),
        title: title,
        favorite: false,
        users: {
          id: uid,
          userID: uid,
          role: "admin",
        },
        column: [],
        order: -1,
      };
      state.Boards.push(data);
    },
    removeBoard: (state, action: PayloadAction<string>) => {
      state.Boards = state.Boards.filter(
        (board) => board.id !== action.payload
      );
      if (action.payload === state.boardIndex) {
        state.boardIndex = "";
      }
    },
    updateBoard: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const { id, title } = action.payload;
      const selected: number[] = [];
      state.Boards.filter((board, index) => {
        if (board.id === id) selected.push(index);
      });
      if (selected.length > 0) state.Boards[selected[0]].title = title;
    },
    setFavoriteBoard: (state, action: PayloadAction<string>) => {
      const selected: number[] = [];
      state.Boards.filter((board, index) => {
        if (board.id === action.payload) selected.push(index);
      });
      if (selected.length > 0)
        state.Boards[selected[0]].favorite =
          !state.Boards[selected[0]].favorite;
    },
    addColumn: (
      state,
      action: PayloadAction<{ title: string; userID: string }>
    ) => {
      const { title } = action.payload;
      const selected: number[] = [];
      state.Boards.filter((board, index) => {
        if (board.id === state.boardIndex) selected.push(index);
      });
      if (selected.length > 0)
        state.Boards[selected[0]].column.push({
          id: "c_" + new Date().toJSON(),
          order: -1,
          task: [],
          title,
        });
    },
    removeColumn: (state, action: PayloadAction<string>) => {
      const selected: number[] = [];
      state.Boards.filter((board, index) => {
        if (board.id === state.boardIndex) selected.push(index);
      });
      if (selected.length > 0)
        state.Boards[selected[0]].column = state.Boards[
          selected[0]
        ].column.filter((col) => col.id !== action.payload);
    },
    updateColumn: (
      state,
      action: PayloadAction<{ title: string; colID: string }>
    ) => {
      const { title, colID } = action.payload;
      const selected: number[] = [];
      state.Boards.filter((board, index) => {
        if (board.id === state.boardIndex) selected.push(index);
      });
      if (selected.length > 0) {
        const colIndex: number[] = [];
        state.Boards[selected[0]].column.filter((col, cindex) => {
          if (col.id === colID) colIndex.push(cindex);
        });

        if (colIndex.length > 0) {
          state.Boards[selected[0]].column[colIndex[0]].title = title;
        }
      }
    },
    addTask: (
      state,
      action: PayloadAction<{ task: taskType; userID: string; colID: string }>
    ) => {
      const { task, colID } = action.payload;
      const selected: number[] = [];
      state.Boards.filter((board, index) => {
        if (board.id === state.boardIndex) selected.push(index);
      });
      if (selected.length > 0) {
        const colIndex: number[] = [];
        state.Boards[selected[0]].column.filter((col, cindex) => {
          if (col.id === colID) colIndex.push(cindex);
        });

        if (colIndex.length > 0) {
          state.Boards[selected[0]].column[colIndex[0]].task.push({
            ...task,
            id: "t_" + new Date().toJSON(),
          });
        }
      }
    },
    removeTask: (
      state,
      action: PayloadAction<{ colID: string; taskID: string }>
    ) => {
      const { taskID, colID } = action.payload;
      const selected: number[] = [];
      state.Boards.filter((board, index) => {
        if (board.id === state.boardIndex) selected.push(index);
      });
      if (selected.length > 0) {
        const colIndex: number[] = [];
        state.Boards[selected[0]].column.filter((col, cindex) => {
          if (col.id === colID) colIndex.push(cindex);
        });

        if (colIndex.length > 0) {
          state.Boards[selected[0]].column[colIndex[0]].task = state.Boards[
            selected[0]
          ].column[colIndex[0]].task.filter((task) => task.id !== taskID);
        }
      }
    },
    updateTask: (
      state,
      action: PayloadAction<{ colID: string; taskID: string; task: taskType }>
    ) => {
      const { taskID, colID, task } = action.payload;
      const selected: number[] = [];
      state.Boards.filter((board, index) => {
        if (board.id === state.boardIndex) selected.push(index);
      });
      if (selected.length > 0) {
        const colIndex: number[] = [];
        state.Boards[selected[0]].column.filter((col, cindex) => {
          if (col.id === colID) colIndex.push(cindex);
        });

        if (colIndex.length > 0) {
          const taskIndex: number[] = [];
          state.Boards[selected[0]].column[colIndex[0]].task.filter(
            (tsk, taskInd) => {
              if (tsk.id === taskID) taskIndex.push(taskInd);
            }
          );

          if (taskIndex.length > 0) {
            state.Boards[selected[0]].column[colIndex[0]].task[
              taskIndex[0]
            ] = task;
          }
        }
      }
    },
    updateOrders: (
      state,
      action: PayloadAction<{ cols: columnType[]; userID: string }>
    ) => {
      const { cols } = action.payload;
      const selected: number[] = [];
      state.Boards.filter((board, index) => {
        if (board.id === state.boardIndex) selected.push(index);
      });
      if (selected.length > 0) state.Boards[selected[0]].column = cols;
    },
    updateBoardsOrders: (
      state,
      action: PayloadAction<{ boards: boardType[]; userID: string }>
    ) => {
      const { boards } = action.payload;
      state.Boards = boards;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  // setUID,
  addBoard,
  removeBoard,
  updateBoard,
  setFavoriteBoard,
  setBoardID,
  addColumn,
  removeColumn,
  updateColumn,
  addTask,
  removeTask,
  updateTask,
  updateOrders,
  updateBoardsOrders,
} = stateSlice.actions;

export const selectUID = (state: RootState) => state.Boards.uid;
export const selectStates = (state: RootState) => state.Boards.Boards || [];
export const selectBoard = (state: RootState) =>
  state.Boards.Boards.find((b) => b.id == state.Boards.boardIndex);

export const selectColumn = (state: RootState) =>
  state.Boards.Boards.find((b) => b.id == state.Boards.boardIndex)?.column ||
  [];

export const selectBoardID = (state: RootState) => state.Boards.boardIndex;

export default stateSlice.reducer;
