import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface StateState {
  state: any[];
  boardIndex:string;
  uid: string;
}

const initialState: StateState = {
  state: [],
  uid: "63bec66661b7a920cc2a0dc2",
  boardIndex:""
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setUID: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    setStates: (state, action: PayloadAction<any[]>) => {
      state.state = action.payload;
    },
    setBoardID: (state, action: PayloadAction<string>) => {
      state.boardIndex = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUID, setStates ,setBoardID } = stateSlice.actions;

export const selectUID = (state: RootState) => state.state.uid;
export const selectStates = (state: RootState) => state.state.state;
export const selectBoard = (state: RootState) => state.state.state.find(b => b.id == state.state.boardIndex);
export const selectBoardID = (state: RootState) => state.state.boardIndex;


export default stateSlice.reducer;
