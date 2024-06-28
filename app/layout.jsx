"use client"
import Local from "next/font/local";
import {useState, useCallback, useEffect} from "react";
import {GlobalStyles} from "tss-react";
import Themer from "./source/components/themer";
import PalettePicker from './content/palette-picker';
import customPalettes from "../public/palettes.json";

const kalvinIconsFont = Local({
    variable: "--kalvin-icons",
    src: [{
        path: "../public/fonts/KalvinIcons.woff",
        weight: "400",
        style: "normal"
    }]
});

export default function Layout({children}) {
    const kalvinIcons = {
        ".kalvin-icons": {
            fontFamily: "var(--kalvin-icons)",
            fontWeight: "normal",
            fontStyle: "normal",
            display: "inline-block",
            lineHeight: 1,
            textTransform: "none",
            letterSpacing: "normal",
            wordWrap: "normal",
            whiteSpace: "nowrap",
            direction: "ltr",

            WebkitFontSmoothing: "antialiased",
            textRendering: "optimizeLegibility",
            MosOsxFontSmoothing: "grayscale",
            fontFeatureSettings: "'liga'"
        }
    }

    // const cookies = {};
    // const cookieStrings = document.cookie.split("; ");
    // for(const cookieString of cookieStrings) {
    //     const [name, value] = cookieString.split('=');
    //     cookies[name] = value;
    // }

    const setDarkModeCookie = useCallback(darkMode => {
        document.cookie = `kalvinPortfolioDarkMode=${darkMode}; path=/; secure; SameSite=Strict; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }, []);
    const setThemeCookie = useCallback(themeName => {
        document.cookie = `kalvinPortfolioTheme=${themeName}; path=/; secure; SameSite=Strict; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }, []);
    return (
            <html lang="en">
                <body className={kalvinIconsFont.variable}>
                    <GlobalStyles styles={kalvinIcons} />
                    <Themer palettePresets={customPalettes} setDarkModeCookie={setDarkModeCookie} setThemeCookie={setThemeCookie}>
                        <PalettePicker />
                        {children}
                    </Themer>
                </body>
            </html>
    );
}