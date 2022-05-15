import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface listState {
	orderType: string;
	order: number;
	perPage: number;
	currentPage: number;
	keyword: string;
	filterType: string;
	dateRange: any[];
}

const initialState: listState = {
	orderType: "createAt",
	order: -1,
	perPage: 15,
	currentPage: 1,
	keyword: "",
	filterType: "keyword",//"forgettingCurve",
	dateRange: [new Date().getTime(), new Date().getTime() - 1000 * 60 * 60 * 24 * 7],
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
		changeRange: (state: listState, action: PayloadAction<number[]>) => {
			state.dateRange = action.payload;
		},
	},
});

export const { changeOrderType, changePerPage, changeCurrent, changeKeyword, changeLength, changeFilterType, changeRange } = listSlice.actions;
//export default listSlice.reducer;
export const listReducer = listSlice.reducer;
