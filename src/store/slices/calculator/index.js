import {createSlice} from "@reduxjs/toolkit"

const calculator=createSlice({
    name:"calculator",
    initialState:{
        display:"test",
        innerState:"test",
        load:["test","test"]
    },
    reducers:{
        setDisplay: (state,action)=>{
            state.display=action.payload
        },
        setInnerState: (state,action)=>{
            state.innerState=action.payload
        },
        setLoad: (state,action)=>{
            state.load=action.payload
        },
        
    }
})
export const { setDisplay, setInnerState, setLoad} = calculator.actions;
export const calculatorReducer = calculator.reducer;
export const changeDisplay=(data)=>(dispatch)=>{
    dispatch(setDisplay(data))
}
export const changeInnerState=(data)=>(dispatch)=>{
    dispatch(setInnerState(data))
}
export const changeLoad=(data)=>(dispatch)=>{
    dispatch(setLoad(data))
}