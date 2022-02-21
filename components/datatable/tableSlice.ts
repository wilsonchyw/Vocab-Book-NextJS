import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface tableState {
    orderType: string;
    order: number;
    perPage: number;
    currentPage:number;
    filter:string,
    length:number
}

const initialState: tableState = {
    orderType: "id",
    order: 1,
    perPage: 15,
    currentPage:1,
    filter:"",
    length:0
};

export const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        changeOrderType: (state: tableState, action: PayloadAction<string>) => {
            state.orderType = action.payload;
            state.order = action.payload === state.orderType ? state.order * -1 : 1;
        },
        changePerPage: (state: tableState, action: PayloadAction<number>) => {
            state.perPage = action.payload;
        },
        changeCurrent: (state: tableState, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        changeFilter:(state: tableState, action: PayloadAction<number>) => {
            state.filter = action.payload;
        },
        changeLength:(state: tableState, action: PayloadAction<number>) => {
            state.length = action.payload;
        },
    },
});

export const { changeOrderType, changePerPage,changeCurrent,changeFilter,changeLength } = tableSlice.actions;
export default tableSlice.reducer;
