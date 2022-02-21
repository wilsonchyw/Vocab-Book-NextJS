import { configureStore } from "@reduxjs/toolkit";
import { dialogReducer, messageReducer, visableReducer, userReducer, listReducer, voiceReducer } from "components/slices";

export const store = configureStore({
    reducer: {
        list: listReducer,
        dialog: dialogReducer,
        message: messageReducer,
        user: userReducer,
        visable: visableReducer,
        voice: voiceReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
