import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render as rtlRender, screen } from "@testing-library/react";
import Navbar from "components/Navbar";
import { dialogReducer, listReducer, userReducer, visibleReducer } from "components/slices";
import { Provider } from "react-redux";

jest.mock("components/Profile", () => () => <div></div>);

const store = configureStore({
    reducer: {
        visible: visibleReducer,
        list: listReducer,
        dialog: dialogReducer,
        user:userReducer
    },
});

function render(ui) {
    return rtlRender(<Provider store={store}>{ui}</Provider>);
}

describe("Navbar Component", () => {
    

    test("Toggle visible status", () => {
        render(<Navbar />);
        fireEvent.click(screen.getByText("Vocab"));
        expect(store.getState().visible.vocab).toEqual(false);
        fireEvent.click(screen.getByText("Meaning"));
        expect(store.getState().visible.vocab).toEqual(false);
    });

    test("Change perPage value", () => {
        const { baseElement } = render(<Navbar />);
        fireEvent.click(baseElement.querySelector("#dropdown-basic"));
        const dropdown = baseElement.firstChild.querySelector(".dropdown-menu");
        fireEvent.click(dropdown.childNodes[2]);
        expect(store.getState().list.perPage).toEqual(20);
    });

    test("Change dialog State (show)", () => {
        render(<Navbar />);
        fireEvent.click(screen.getByText("New"));
        expect(store.getState().dialog.show).toEqual(true);
        expect(store.getState().dialog.isEdit).toEqual(false);
    });

    test("Change user State (dialog)", () => {
        const { baseElement } = render(<Navbar />);
        fireEvent.click(baseElement.querySelector("svg").parentNode);
        expect(store.getState().user.dialog).toEqual(true);
    });
});
