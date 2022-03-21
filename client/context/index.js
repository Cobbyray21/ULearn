import {useReducer, createContext } from "react";

const initialState = {
    user: null
}

//Create context
const Context = createContext();

//Create rootreducer
const rootReducer =(state, action)=>{
    switch(action.type){
        case "LOGIN":
            return {...state, user: action.payload}

        case "LOGOUT":
            return{...state, user: null} 
        default: 
        return state   
        }
}

//Create Context Provider
const Provider= ({children})=>{
    const[state, dispatch] = useReducer(rootReducer,initialState)
    return(
    <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>

    )}

export {Context, Provider}