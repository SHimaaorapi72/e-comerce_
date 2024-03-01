import { createContext, useState } from "react";

export let cartNumber =createContext()


export default function CartNumberProvider(props){

    const [cartNum , setCartNumber] =useState(0)




    return<cartNumber.Provider value={{cartNum , setCartNumber}}>
        {props.children}
    </cartNumber.Provider>

}