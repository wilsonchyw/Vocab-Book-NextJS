import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface voiceState {
  lang: string;
  name: string;
  rate: number;
}

const initialState: voiceState = {
  lang: getFromLocal("lang", "en-US"),
  name: getFromLocal("langName", "English (United States)"),
  rate: 0.7,
};

function saveLocal(key: string, value: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
}

function getFromLocal(key: string, _default: string) {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    if (data) return data;
  }
  return _default;
}

export const voiceSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setRate: (state: voiceState, action: PayloadAction<number>) => {
      state.rate = action.payload;
    },
    setVoide: (
      state: voiceState,
      action: PayloadAction<{ name: string; lang: string }>,
    ) => {
      state.lang = action.payload.lang;
      state.name = action.payload.name;
      saveLocal("lang", action.payload.lang);
      saveLocal("langName", action.payload.name);
    },
  },
});

export const { setRate, setVoide } = voiceSlice.actions;
//export default voiceSlice.reducer;
export const voiceReducer = voiceSlice.reducer;
