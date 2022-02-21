import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render as rtlRender, screen } from "@testing-library/react";
import Divider from "components/Divider";
import Message from "components/Message";
import { messageReducer, setMessage } from "components/slices/messageSlice";
import { Provider } from "react-redux";

const store = configureStore({
    reducer: {
        message: messageReducer,
    },
});

function render(ui) {
    return rtlRender(<Provider store={store}>{ui}</Provider>);
}

describe("Message component", () => {
    it("Should show a message box that contain the state", async () => {
        render(<Message />);
        store.dispatch(setMessage("Hello"));
        expect(store.getState().message.message).toEqual("Hello");
        expect(screen.getByText(/Hello/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole("alert"));
        expect(screen.queryByText(/Hello/i)).not.toBeInTheDocument();
    });
});

describe("Divider component", () => {
    it("should show content in the divider component", () => {
        render(<Divider content="test" />);
        expect(screen.getByText("test")).toBeInTheDocument();
    });
});
