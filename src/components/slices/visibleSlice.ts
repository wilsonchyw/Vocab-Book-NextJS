import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface visibleState {
  [key: string]: Boolean | any;
}

const initialState: visibleState = {
  vocab: true,
  meaning: true,
  detail: {
    always: false,
    onCorrect: false,
  },
};

export const visibleSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    toggleVisible: (state: visibleState, action: PayloadAction<Object>) => {
      const key = action.payload;
      state[key] = !state[key];
    },
    toggleDetail: (state: visibleState, action: PayloadAction<object>) => {
      const key = action.payload;
      state.detail[key] = !state.detail[key];
    },
  },
});

export const { toggleVisible, toggleDetail } = visibleSlice.actions;
//export default visibleSlice.reducer;
export const visibleReducer = visibleSlice.reducer;
