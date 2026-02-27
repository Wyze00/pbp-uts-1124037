import { createSlice } from "@reduxjs/toolkit";
import type { Menu } from "../types/Menu";

const initialState: Menu[] = [];

type MenuSliceAction = {
    type: string;
    payload: Menu[] | undefined;
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setState: (_, action: MenuSliceAction) => {
            return action.payload;
        }
    },
    selectors: {
       getState: (state: Menu[]) => {
          return state;
       }   
    }
})

export const menuSliceReducers = menuSlice.reducer;
export const menuSliceActions = menuSlice.actions;
export const menuSliceSelector = menuSlice.selectors;