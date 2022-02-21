import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface visableState {
    [key: string]: Boolean;
}

const initialState: visableState = {
    vocab: true,
    meaning: true,
};

export const visableSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        toggleVisable: (state: visableState, action: PayloadAction<Object>) => {
            const key = action.payload;
            state[key] = !state[key];
        },
    },
});

export const { toggleVisable } = visableSlice.actions;
//export default visableSlice.reducer;
export const visableReducer = visableSlice.reducer;
