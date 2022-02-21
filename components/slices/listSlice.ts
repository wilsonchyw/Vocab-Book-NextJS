import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface listState {
    orderType: string;
    order: number;
    perPage: number;
    currentPage: number;
    keyword: string;
    filterType: string;
}

const initialState: listState = {
    orderType: "createAt",
    order: -1,
    perPage: 15,
    currentPage: 1,
    keyword: "",
    filterType: "keyword",
};

export const listSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        changeOrderType: (state: listState, action: PayloadAction<string>) => {
            state.orderType = action.payload;
            state.order = action.payload === state.orderType ? state.order * -1 : 1;
        },
        changePerPage: (state: listState, action: PayloadAction<number>) => {
            state.perPage = action.payload;
        },
        changeCurrent: (state: listState, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        changeKeyword: (state: listState, action: PayloadAction<number>) => {
            state.keyword = action.payload;
        },
        changeFilterType: (state: listState, action: PayloadAction<string>) => {
            state.filterType = action.payload;
        },
    },
});

export const { changeOrderType, changePerPage, changeCurrent, changeKeyword, changeLength, changeFilterType } = listSlice.actions;
//export default listSlice.reducer;
export const listReducer = listSlice.reducer;
