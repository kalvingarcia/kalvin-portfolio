"use client"
import {createContext, useContext} from "react"

const ContainerContext = createContext({role: "neutral", type: "container"});

export function useContainerContext() {
    return useContext(ContainerContext);
}

export function ContainerContextProvider({role, type, children}) {
    return (
        <ContainerContext.Provider value={{role, type}}>
            {children}
        </ContainerContext.Provider>
    )
}