import {  configureStore } from "@reduxjs/toolkit";
import litableSlice from "./litableSlice";



//Export reducer to have access in React component
export const store = configureStore({
    reducer: litableSlice.reducer
})
