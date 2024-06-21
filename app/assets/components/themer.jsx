"use client"
import {useState, useCallback, createContext, useContext, useRef, useEffect} from "react";
import {NextAppDirEmotionCacheProvider} from "tss-react/next/appDir";
import {createTss, GlobalStyles} from "tss-react";
import Color from "color";

// The colors for the default palette.
const oxford = "#011638";
const charcoal = "#364156";
const honeydew = "#DFF8EB";
const melon = "#F0A49F";
const silver = "#CDCDCD";

// The theme context.
export const ThemeContext = createContext();
// The dark mode context.
export const DarkModeContext = createContext();

// The tss object provided by the createTss method.
export const tss = createTss({useContext: () => {
    return {theme: useContext(ThemeContext).theme};
}}).tss;

// A map of lightness values for the theme creator function.
const lightness = {
    dark: {
        accent: 80,
        onAccent: 20,
        container: 30,
        onContainer: 90,
        background: 5,
        surfaceLowest: 10,
        surfaceLow: 12.5,
        surface: 15,
        surfaceHigh: 17.5,
        surfaceHighest: 20,
        onSurface: 90,
        outline: 60,
        shadow: 0
    },
    light: {
        accent: 40,
        onAccent: 90,
        container: 80,
        onContainer: 10,
        background: 95,
        surfaceLowest: 90,
        surfaceLow: 87.5,
        surface: 85,
        surfaceHigh: 82.5,
        surfaceHighest: 8,
        onSurface: 10,
        outline: 50,
        shadow: 0
    },
    code: {
        background: 10,
        onBackground: 90,
        keyword: 60,
        entity: 70,
        constant: 60,
        string: 60,
        variable: 90,
        comment: 20,
        tag: 50
    }
};

/**
 * The Themer is specifically made to cache styles using tss-react's NextAppDirEmotionCacheProvider. The component also has dark mode context
 * and theme context providers. These are specifically to allow the user to add and remove theme objects, change themes, and change scheme by
 * toggling dark mode. The themes are auto generated using color.js and a mapping object to map palette colors to the themes colors.
 * 
 * There are also global styles provided by the Themer which provides a reset to the HTML elements.
 * 
 * @param props The component only takes 1 prop. The `children` prop is specifically used to hold everything that will be themed.
 * @returns A React component.
 */
export default function Themer({children}) {
    // The dark mode boolean which won't be directly mutable by the user. Instead a toggle function is given.
    const [darkMode, setDarkMode] = useState(true);
    // The toggle function which alternated the dark mode boolean between true and false.
    const toggleDarkMode = useCallback(() => {
        setDarkMode(!darkMode);
    }, [darkMode]);

    // This is the palette dictionary object, which will keep track of all the added palettes.
    // The dictionary is given a default palette, which is just a generic looking color
    // palette.
    const paletteDictionary = useRef({default: {primary: oxford, secondary: charcoal, tertiary: honeydew, error: melon, neutral: silver}});
    // This function is used to add the palettes to the dictionary using a provided name.
    // By using this method, any palette can be overwritten, even the default palette.
    const addPalette = useCallback((themeName, paletteObject) => {
        if(!themeName || !paletteObject)
            return console.error("The function `addPalette` requires 2 arguments: themeName and paletteObject.");
        paletteDictionary.current[themeName] = paletteObject;
    }, [paletteDictionary]);
    // The function removePaletee, removes a palette from the dictionary.
    const removePalette = useCallback(themeName => {
        if(!themeName)
            return console.error("The function `removePalette` requires 1 argument: themeName.");
        delete paletteDictionary.current[themeName];
    }, [paletteDictionary]);

    // This function is used to generate the theme object for the context. The function cannot be accessed by the user
    // directly.
    // It is cached using the useCallback hook, such that when the method is called using the same parameters it returns
    // the value more quickly instead of needing to generate the theme each time.
    const createTheme = useCallback((themeName, paletteObject, darkMode) => {
        try {
            const primary = Color(paletteObject.primary);
            const secondary = Color(paletteObject.secondary);
            const tertiary = Color(paletteObject.tertiary);
            const error = Color(paletteObject.error);
            const neutral = Color(paletteObject.neutral);

            // The object is populated with color objects, this gives the user finetuning abilities.
            // The theme name is also housed in the object so the user can display it, but its mostly
            // so that toggling darkMode works.
            return {
                name: themeName,
                primary: {
                    accent: primary.lightness(lightness[darkMode? 'dark' : 'light'].accent),
                    onAccent: primary.lightness(lightness[darkMode? 'dark' : 'light'].onAccent),
                    container: primary.lightness(lightness[darkMode? 'dark' : 'light'].container),
                    onContainer: primary.lightness(lightness[darkMode? 'dark' : 'light'].onContainer),
                },
                secondary: {
                    accent: secondary.lightness(lightness[darkMode? 'dark' : 'light'].accent),
                    onAccent: secondary.lightness(lightness[darkMode? 'dark' : 'light'].onAccent),
                    container: secondary.lightness(lightness[darkMode? 'dark' : 'light'].container),
                    onContainer: secondary.lightness(lightness[darkMode? 'dark' : 'light'].onContainer),
                },
                tertiary: {
                    accent: tertiary.lightness(lightness[darkMode? 'dark' : 'light'].accent),
                    onAccent: tertiary.lightness(lightness[darkMode? 'dark' : 'light'].onAccent),
                    container: tertiary.lightness(lightness[darkMode? 'dark' : 'light'].container),
                    onContainer: tertiary.lightness(lightness[darkMode? 'dark' : 'light'].onContainer),
                },
                error: {
                    accent: error.lightness(lightness[darkMode? 'dark' : 'light'].accent),
                    onAccent: error.lightness(lightness[darkMode? 'dark' : 'light'].onAccent),
                    container: error.lightness(lightness[darkMode? 'dark' : 'light'].container),
                    onContainer: error.lightness(lightness[darkMode? 'dark' : 'light'].onContainer),
                },
                neutral: {
                    background: neutral.lightness(lightness[darkMode? 'dark' : 'light'].background),
                    surfaceLowest: neutral.lightness(lightness[darkMode? 'dark' : 'light'].surfaceLowest),
                    surfaceLow: neutral.lightness(lightness[darkMode? 'dark' : 'light'].surfaceLow),
                    surface: neutral.lightness(lightness[darkMode? 'dark' : 'light'].surface),
                    surfaceHigh: neutral.lightness(lightness[darkMode? 'dark' : 'light'].surfaceHigh),
                    surfaceHighest: neutral.lightness(lightness[darkMode? 'dark' : 'light'].surfaceHighest),
                    onSurface: neutral.lightness(lightness[darkMode? 'dark' : 'light'].onSurface),
                    outline: neutral.lightness(lightness[darkMode? 'dark' : 'light'].outline),
                    shadow: neutral.lightness(lightness[darkMode? 'dark' : 'light'].shadow)
                }
            };
        } catch(error) {
            // If the palette objects the user provided didn't name the properties necessary,
            // then an error is displayed.
            console.error("While creating a theme an error occured: " + error.message);
            return undefined;
        }
    }, []);

    // The theme object is only mutable using the changeTheme method. It is given a default value of the
    // default palette.
    const [theme, setTheme] = useState(createTheme("default", paletteDictionary.current.default, darkMode));
    const changeTheme = useCallback((themeName) => {
        try {
            // The new theme is created.
            const newTheme = createTheme(themeName, paletteDictionary.current[themeName], darkMode);
            if(!newTheme) // If the theme isn't defined, then that means the palette object was structured incorrectly.
                return console.warn("Theme was not created sucessfully. Please ensure your palette object has primary, secondary, tertiary, error, and neutral as properties.");
            setTheme(newTheme);
        } catch(error) { // If an invalid themeName is given, then the function displays an error.
            console.error("While setting a theme an error occured: " + error.message);
        }
    }, [paletteDictionary, paletteDictionary.current, darkMode]);
    // Whenever darkMode changes, the theme also needs to be updated.
    useEffect(() => {
        changeTheme(theme.name);
    }, [darkMode]);

    const defaults = {
        "*": {
            boxSizing: "border-box",
            "&::before, &::after": {
                boxSizing: "border-box",
            }
        },
        html: {
            MozTextSizeAdjust: "none",
            WebkitTextSizeAdjust: "none",
            textSizeAdjust: "none",
            "& *": {
                transition: "background-color 300ms ease"
            }
        },
        body: {
            backgroundColor: theme.neutral.background.hex(),
            color: theme.neutral.onSurface.hex(),
        },
        "body, h1, h2, h3, h4, p, figure, blockquote, dl, dd": {
            margin: 0
        },
        'ul[role="list"], ol[role="list"]': {
            listStyle: "none"
        },
        "html, body": {
            position: "relative",
            width: "100%",
            minWidth: "100%",
            maxWidth: "100%",
            overflowX: "hidden",
            minHeight: "100vh",
            lineHeight: 1.5,
            overscrollBehavior: "none", // This part was specifically to avoid MacOS overscroll, which was bugging me.
        
            fontFamily: "var()",
            fontWeight: "400",
            fontStyle: "normal",
        },
        "h1, h2, h3, h4, button, input, label": {
            lineHeight: 1
        },
        "h1, h2, h3, h4": {
            textWrap: "balance"
        },
        "a": {
            "&:not([class])": {
                textDecorationSkipInk: "auto",
                color: "currentcolor"
            }
        },
        "img, picture": {
            maxWidth: "100%",
            display: "block"
        },
        "input, button, textarea, select": {
            font: "inherit"
        },
        "textarea": {
            "&:not([rows])": {
                minHeight: "10em"
            }
        },
        ":target": {
            scrollMarginBlock: "5ex"
        }
    };

    return (
        <NextAppDirEmotionCacheProvider options={{key: "css"}}>
            <ThemeContext.Provider value={{theme, changeTheme, addPalette, removePalette}} >
                <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
                    <GlobalStyles styles={defaults} />
                    {children}
                </DarkModeContext.Provider>
            </ThemeContext.Provider>
        </NextAppDirEmotionCacheProvider>
    );
}