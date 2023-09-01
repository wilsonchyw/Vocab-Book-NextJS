import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type message = {
  content: string;
  type: string;
};

export interface messageState {
  messageQueue: message[];
  message: String;
  type: String;
  duration: number | null;
}

const initialState: messageState = {
  messageQueue: [],
  message: "",
  type: "normal",
  duration: null,
};

export const messageSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    deQueue: (state: messageState) => {
      state.messageQueue = state.messageQueue.slice(1);
    },
    setMessage: (state: messageState, action: PayloadAction<message>) => {
      state.messageQueue = [...state.messageQueue, action.payload];
    },
    setMessageQueue: (
      state: messageState,
      action: PayloadAction<message[]>,
    ) => {
      state.messageQueue = action.payload;
    },
  },
});

export const { setMessage, setMessageQueue, deQueue } = messageSlice.actions;
export const messageReducer = messageSlice.reducer;

export function setMsg(content: string, type = "normal", duration = 2000) {
  return async (dispatch, getState) => {
    dispatch(setMessage({ content, type }));
    setTimeout(() => dispatch(deQueue()), duration);
  };
}
