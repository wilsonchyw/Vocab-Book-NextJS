import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface visableState {
    [key: string]: Boolean|any
}

const initialState: visableState = {
    vocab: true,
    meaning: true,
    detail: {
        all:false,
        onCorrect:false
    },
};

export const visableSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        toggleVisable: (state: visableState, action: PayloadAction<Object>) => {
            const key = action.payload;
            state[key] = !state[key];
        },
        toggleDetail:(state:visableState,action:PayloadAction<object>)=>{
            const key = action.payload
            state.detail[key]=!state.detail[key]
        }
    },
});

export const { toggleVisable,toggleDetail } = visableSlice.actions;
//export default visableSlice.reducer;
export const visableReducer = visableSlice.reducer;
