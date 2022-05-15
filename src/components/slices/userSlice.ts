import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Vocab } from "lib/vocab";
const REVISION_INTERVAL = "revisionInterval";
const AUTO_PLAY = "auto_play";

export interface userState {
    user: String | null;
    isLogin: Boolean;
    isLocalLogin: Boolean;
    vocabs: Vocab[] | null;
    vocabLength: number;
    dialog: Boolean;
    revisionInterval: Number[];
    autoPlay: {
        onCorrect: Boolean;
        onVerifierClick: Boolean;
        [key: string]: Boolean;
    };
    revisionDays: number[];
    learningDay: number;
}

const initialState: userState = {
    user: null,
    isLogin: false,
    isLocalLogin: false,
    vocabs: null,
    vocabLength: 0,
    dialog: false,
    revisionInterval: getFromLocal(REVISION_INTERVAL, [1, 2, 7, 21, 30]),
    autoPlay: (() => {
        const data = getFromLocal(AUTO_PLAY, {});
        return data.hasOwnProperty("onCorrect") ? data : { onCorrect: false, onVerifierClick: false };
    })(),
    revisionDays: [],
    learningDay: new Date().getTime(),
};

function saveLocal(key: string, value: any) {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

function getFromLocal(key: string, _default: any) {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data);
    }
    return _default;
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: userState, action: PayloadAction<Object>) => {
            state.user = action.payload;
        },
        setVocabLength: (state: userState, action: PayloadAction<number>) => {
            state.vocabLength = action.payload;
        },
        setLogin: (state: userState, action: PayloadAction<Boolean>) => {
            state.isLogin = action.payload;
        },
        setLocalLogin: (state: userState, action: PayloadAction<Boolean>) => {
            state.isLocalLogin = action.payload;
        },
        setVocabs: (state: userState, action: PayloadAction<Vocab[]>) => {
            state.vocabs = action.payload;
            if (action.payload != null) state.vocabLength = action.payload.length;
        },
        toggleDialog: (state: userState) => {
            state.dialog = !state.dialog;
        },
        toggleAutoPlay: (state: userState, action: PayloadAction<string>) => {
            state.autoPlay[action.payload] = !state.autoPlay[action.payload];
            saveLocal(AUTO_PLAY, state.autoPlay);
        },
        setRevisionInterval: (state: userState, action: PayloadAction<Number>) => {
            const index = state.revisionInterval.indexOf(action.payload);
            const result = index === -1 ? state.revisionInterval.concat([action.payload]) : state.revisionInterval.filter((x) => x != action.payload);
            state.revisionInterval = result;
            saveLocal(REVISION_INTERVAL, result);
        },
        setRevisionDays: (state: userState, action: PayloadAction<string[]>) => {
            state.revisionDays = action.payload.map((day: string) => parseInt(day));
        },
        setLearningDate: (state: userState, action: PayloadAction<number>) => {
            state.learningDay = action.payload;
        },
    },
});

export const { setUser, toggleDialog, setRevisionInterval, toggleAutoPlay, setLogin, setVocabs, setVocabLength, setLocalLogin, setRevisionDays, setLearningDate } = userSlice.actions;
//export default userSlice.reducer;
export const userReducer = userSlice.reducer;
