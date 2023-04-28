import { configureStore } from "@reduxjs/toolkit";
import { calculatorReducer } from "./slices/calculator"; 
export const store= configureStore({
    reducer:{
        calculatorReducer,
    }
})