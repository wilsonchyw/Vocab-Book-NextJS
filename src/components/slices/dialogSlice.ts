import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vocab, Inflection } from "lib/vocab";

export interface dialogState {
  show: Boolean;
  isEdit: Boolean;
  vocab: Vocab;
  inflection: Inflection;
  example: string[];
}

export const initialState: dialogState = {
  show: false,
  isEdit: false,
  vocab: {
    id: "",
    vocabulary: "",
    meaning: "",
    type: "adjective",
    createAt: 0,
  },
  inflection: {
    verb: {},
    noun: {},
    adjective: {},
    adverb: {},
  },
  example: [],
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    handleHide: (state: dialogState) => {
      state.show = false;
    },
    handleShow: (state: dialogState) => {
      state.show = true;
    },
    setEdit: (
      state: dialogState,
      action: PayloadAction<{ vocab?: Vocab; inflection?: Inflection }>,
    ) => {
      if (action.payload.vocab) state.vocab = action.payload.vocab;
      if (action.payload.inflection) {
        state.inflection =
          typeof action.payload.inflection === "string"
            ? JSON.parse(action.payload.inflection)
            : action.payload.inflection;
      } else {
        state.inflection = initialState.inflection;
      }
      if (action.payload.example) {
        state.example =
          typeof action.payload.example === "string"
            ? JSON.parse(action.payload.example)
            : action.payload.example;
      } else {
        state.example = [];
      }
      state.show = true;
      state.isEdit = true;
    },
    toggleCreate: (state: dialogState) => {
      state.show = true;
      state.isEdit = false;
      state.vocab = initialState.vocab;
      state.inflection = initialState.inflection;
      state.example = initialState.example;
    },
    changeVocab: (state: dialogState, action: PayloadAction<any>) => {
      state.vocab = action.payload;
    },
    setInflection: (state: dialogState, action: PayloadAction<any>) => {
      state.inflection = action.payload;
    },
    setExample: (
      state: dialogState,
      action: PayloadAction<{ index: number; value: string }>,
    ) => {
      const index = action.payload.index;
      const _example = [...state.example];
      _example[index] = action.payload.value;
      state.example = _example;
    },
  },
});

export const {
  handleHide,
  handleShow,
  setEdit,
  toggleCreate,
  changeVocab,
  setExample,
  setInflection,
} = dialogSlice.actions;
//export default dialogSlice.reducer;
export const dialogReducer = dialogSlice.reducer;
