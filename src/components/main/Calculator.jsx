import {changeDisplay,changeInnerState,changeLoad} from "../../store/slices/calculator"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

export const Calculator = () => {
  const display = useSelector((state) => state.calculatorReducer.display);
  const innerState = useSelector((state) => state.calculatorReducer.innerState);
  const load = useSelector((state) => state.calculatorReducer.load);
  const dispatch=useDispatch()
  const resolveEquations=(arr)=>{
    const [first,operation,second,sign]=arr
    let result;
    switch(operation) {
      case "+":
        result=parseFloat(first)+parseFloat(second)
        console.log(result)
        return [result,sign]
      case "-":
        result=parseFloat(first)-parseFloat(second)
        return [result,sign]
      case "*":
        result=parseFloat(first)*parseFloat(second)
        return [result,sign]
      case "/":
        result=parseFloat(first)/parseFloat(second)
        return [result,sign]
      default:
      console.log("something went wrong")
      break
    }
  }
  useEffect(()=>{
    if (load.length>3) {
      let results=resolveEquations(load)
      let [result,key]=results
      const fixin=(data)=>{
        const numberf=parseFloat(data).toFixed(2)
        return numberf.toString()
      }
      dispatch(changeDisplay(fixin(result)+key))
      dispatch(changeLoad([result,key]))
    }
    // eslint-disable-next-line
  },[load])
  const calculatorButton=(key)=>{
    if (key!=="+" && key!=="-" && key!=="/" && key!=="*" && key!=="." && key!=="0") {
      dispatch(changeDisplay(display+key))
      dispatch(changeInnerState(innerState+key))
    } else if(!innerState.includes(".") && key==="." && innerState.length>0){ 
      dispatch(changeDisplay(display+key))
      dispatch(changeInnerState(innerState+key))
    } else if(key==="0" && innerState.length>0 && !innerState.includes("0")){ 
      dispatch(changeDisplay(display+key))
      dispatch(changeInnerState(innerState+key))
    } else if(!innerState.includes("0") && key==="0" && innerState.length===0){
      dispatch(changeDisplay(display+key+"."))
      dispatch(changeInnerState(innerState+key+"."))
    } else if(innerState.includes("0") && key==="0"){

    } else if(key==="-" && display.length===0) {
      dispatch(changeDisplay(display+key))
      dispatch(changeInnerState(key))
    } else if((key==="+" || key==="-" || key==="/" || key==="*") && display[display.length-1]!=="+" && display[display.length-1]!=="*" && display[display.length-1]!=="/" && load.length<2){
      dispatch(changeDisplay(display+key))
      dispatch(changeLoad([...load,innerState,key]))
      dispatch(changeInnerState(""))
    } else if((key==="+" || key==="/" || key==="*") && innerState.length<1 )  {
      dispatch(changeDisplay(display.slice(0,display.length-1)+key))
      dispatch(changeLoad([[...load][0],key]))
    } else if(key==="-" && display[display.length-1]!=="-" && innerState.length<1){
      console.log(display[display.length-1])
      dispatch(changeDisplay(display+key))
      dispatch(changeInnerState(innerState+key))
    } else if(key==="+" || key==="-" || key==="/" || key==="*"){
      dispatch(changeLoad([...load,innerState,key]))
      dispatch(changeDisplay(load))
      dispatch(changeInnerState(""))
      dispatch(changeLoad([...load,innerState,key]))
    }
    
  }
  
  const reset=()=>{
    dispatch(changeDisplay(""))
    dispatch(changeInnerState(""))
    dispatch(changeLoad([]))
  }
  const equals=()=>{
    console.log(load.length)
    console.log(load)
    if(load.length===2 && innerState.length>0) {
      const [result,key]=resolveEquations([...load,innerState])
      console.log(result)
      dispatch(changeInnerState(""))
      dispatch(changeDisplay(result))
      dispatch(changeLoad([result]))
      console.log(load)
    } else if (load.length===3 && load[1]==="") {
      const [result,key]=resolveEquations([load[0],load[2],innerState])
      dispatch(changeInnerState(""))
      dispatch(changeDisplay(result))
      dispatch(changeLoad([result]))
      console.log(load)
    } else {
      const [result,key]=resolveEquations([load[0]+load[1],load[2],innerState])
      dispatch(changeInnerState(""))
      dispatch(changeDisplay(result))
      dispatch(changeLoad([result]))
    }
    
  }
  return <>
  <section className="calculator-container">
    <div className="calc-display">def</div>
    <button className="calc-utility" id="c" onClick={()=>{reset()}}>c</button>
    <button className="calc-operation" id="/" onClick={()=>{calculatorButton("/")}}>/</button>
    <button className="calc-number" id="7" onClick={()=>{calculatorButton("7")}}>7</button>
    <button className="calc-number" id="8" onClick={()=>{calculatorButton("8")}}>8</button>
    <button className="calc-number" id="9" onClick={()=>{calculatorButton("9")}}>9</button>
    <button className="calc-operation" id="*" onClick={()=>{calculatorButton("*")}}>*</button>
    <button className="calc-number" id="4" onClick={()=>{calculatorButton("4")}}>4</button>
    <button className="calc-number" id="5" onClick={()=>{calculatorButton("5")}}>5</button>
    <button className="calc-number" id="6" onClick={()=>{calculatorButton("6")}}>6</button>
    <button className="calc-operation" id="+" onClick={()=>{calculatorButton("+")}}>+</button>
    <button className="calc-number" id="1" onClick={()=>{calculatorButton("1")}}>1</button>
    <button className="calc-number" id="2" onClick={()=>{calculatorButton("2")}}>2</button>
    <button className="calc-number" id="3" onClick={()=>{calculatorButton("3")}}>3</button>
    <button className="calc-operation" id="-" onClick={()=>{calculatorButton("-")}}>-</button>
    <button className="calc-utility" id="." onClick={()=>{calculatorButton(".")}}>.</button>
    <button className="calc-number" id="0" onClick={()=>{calculatorButton("0")}}>0</button>
    <button className="calc-utility" id="eq" onClick={()=>{equals()}}>=</button> 
  </section>
  <section className="debug">
    <p >display: {display}</p>
    <p >innerState: {innerState}</p>
    <p >load: {load}</p>
  </section>
    </>
}
