import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   data: [],
   isLoading:false,
   errorLnull,
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {

    }
})

export const weatherReducer = weatherSlice.reducer;