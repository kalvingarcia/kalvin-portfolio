"use client"
import {useState, useCallback, createContext, useContext, useRef} from "react";
import {createTss, GlobalStyles} from "tss-react";
import {createTheme} from "../helper/theme";

const oxford = "#011638";
const honeydew = "#DFF8EB";
const charcoal = "#364156";
const melon = "#F0A49F";
const silver = "#CDCDCD";

const ThemeContext = createContext();
const DarkModeContext = createContext();

export const tss = createTss({useContext: () => {
    return {theme: useContext(ThemeContext).theme};
}}).tss;

const defaults = {

};
export default function Themer({children}) {
    const themeDictionary = useRef({default: {primary: oxford, secondary: honeydew, tertiary: charcoal, error: melon, neutral: silver}});
    const addTheme = useCallback((themeName, paletteObject) => {
        themeDictionary.current[themeName] = paletteObject;
    }, [themeDictionary]);

    const [theme, setTheme] = useState(createTheme(themeDictionary.default));
    const changeTheme = useCallback((themeName) => {
        setTheme(createTheme(themeDictionary.current[themeName], darkMode));
    }, [themeDictionary, themeDictionary.current, darkMode]);

    const [darkMode, setDarkMode] = useState(true);
    const toggleDarkMode = useCallback(() => {
        setDarkMode(!darkMode);
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{theme, addTheme, changeTheme}} >
            <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
                <GlobalStyles styles={defaults} />
                {children}
            </DarkModeContext.Provider>
        </ThemeContext.Provider>
    );
}