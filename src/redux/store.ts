import { configureStore } from "@reduxjs/toolkit";
import { menuSliceReducers } from "./menuSlice";

export const store = configureStore({
    reducer: {
        menu: menuSliceReducers,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;