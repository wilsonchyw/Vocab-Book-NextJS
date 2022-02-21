import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface messageState {
    message: String;
    type: String;
}

const initialState: messageState = {
    message: "",
    type: "normal",
};

export const messageSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        setMessage: (state: messageState, action: PayloadAction<any>) => {
            if (typeof action.payload === "string") {
                state.message = action.payload;
                state.type = "normal";
            } else {
                state.message = action.payload.message;
                state.type = action.payload.type;
            }
        },
    },
});

export const { setMessage } = messageSlice.actions;
//export default messageSlice.reducer;
export const messageReducer = messageSlice.reducer;
