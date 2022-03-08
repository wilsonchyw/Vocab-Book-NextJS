import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface voiceState {
    lang: string;
    name: string;
    rate: number;
}

const initialState: voiceState = {
    lang: localStorage.getItem("lang") || "en-US",
    name: localStorage.getItem("langName") || "English (United States)",
    rate: 0.7,
};

export const voiceSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        setRate: (state: voiceState, action: PayloadAction<number>) => {
            state.rate = action.payload;
        },
        setVoide: (state: voiceState, action: PayloadAction<{ name: string; lang: string }>) => {
            state.lang = action.payload.lang;
            state.name = action.payload.name;
            localStorage.setItem("lang", action.payload.lang)
            localStorage.setItem("langName", action.payload.name)
        },
    },
});

export const { setRate, setVoide } = voiceSlice.actions;
//export default voiceSlice.reducer;
export const voiceReducer = voiceSlice.reducer;
