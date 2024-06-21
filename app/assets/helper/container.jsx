"use client"
import {createContext, useContext} from "react"

const ContainerContext = createContext({role: "neutral", type: "container"});

export function useContainerContext() {
    const {role, type} = useContext(ContainerContext);
    return {role, type: role === "neutral"? "surface" : type}
}

export function ContainerContextProvider({role, type, children}) {
    return (
        <ContainerContext.Provider value={{role, type}}>
            {children}
        </ContainerContext.Provider>
    )
}