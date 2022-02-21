import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const REVISION_INTERVAL = "revisionInterval"

export interface userState {
    user: String | null;
    vocabs: Number;
    dialog: Boolean;
    revisionInterval: Number[];
}

const initialState: userState = {
    user: null,
    vocabs: 0,
    dialog: false,
    revisionInterval: getFromLocal(REVISION_INTERVAL,[1, 2, 7, 21, 30]),
};

function saveLocal(key:string,value:any){
    if (typeof window !== 'undefined') {
        localStorage.setItem(key,JSON.stringify(value))
    }
}

function getFromLocal(key:string,_default:any){
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(key)
        if (data) return JSON.parse(data)
    }
    return _default
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: userState, action: PayloadAction<Object>) => {
            state.user = action.payload;
        },
        setVocabs: (state: userState, action: PayloadAction<Object>) => {
            state.vocabs = action.payload;
        },
        toggleDialog: (state: userState) => {
            state.dialog = !state.dialog;
        },
        setRevisionInterval: (state: userState, action: PayloadAction<Number>) => {
            const index = state.revisionInterval.indexOf(action.payload);
            const result = index === -1 ? state.revisionInterval.concat([action.payload]) : state.revisionInterval.filter((x) => x != action.payload);
            state.revisionInterval = result;
            saveLocal(REVISION_INTERVAL,result)
        },
    },
});

export const { setUser, setVocabs, toggleDialog, setRevisionInterval } = userSlice.actions;
//export default userSlice.reducer;
export const userReducer = userSlice.reducer;
