import "@testing-library/jest-dom";
import { initialState, dialogReducer, handleShow, setEdit } from "components/slices/dialogSlice";

describe("Dialog slice", () => {
    const vocab = {
        id: "ce342f86",
        type: "adjective",
        meaning: "有勇氣的",
        vocabulary: "daring",
        inflection: '{"verb":{"vocab":"dare","meaning":"敢"},"noun":{"vocab":""},"adjective":{},"adverb":{}}',
        createAt: "1643368093483",
        example: '["This is a daring new film","He did not dare to leave his car there"]',
    };

    it("Should change hide status", () => {
        const result = { ...initialState, show: true };
        expect(dialogReducer(initialState, handleShow)).toEqual(result);
    });

    it("Should change vocab status", () => {
        const result = { ...initialState, vocab: vocab, show: true, isEdit: true };
        expect(dialogReducer(initialState, setEdit({ vocab: vocab }))).toEqual(result);
    });

    it("Should change inflection status", () => {
        const result = {
            ...initialState,
            show: true,
            isEdit: true,
            inflection: { verb: { vocab: "dare", meaning: "敢" }, noun: { vocab: "" }, adjective: {}, adverb: {} },
        };
        expect(dialogReducer(initialState, setEdit({ inflection: vocab.inflection }))).toEqual(result);
    });
});
