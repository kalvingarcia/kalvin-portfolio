"use client"
import {getCookie, setCookie} from "cookies-next";
import Local from "next/font/local";
import {useCallback} from "react";
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

    const setDarkModeCookie = useCallback(darkMode => {
        setCookie("kalvinPortfolioDarkMode", darkMode);
    }, []);
    const setThemeCookie = useCallback(themeName => {
        setCookie("kalvinPortfolioTheme", themeName);
    }, []);
    return (
            <html lang="en">
                <body className={kalvinIconsFont.variable}>
                    <GlobalStyles styles={kalvinIcons} />
                    <Themer darkModeDefault={(/true/i).test(getCookie("kalvinPortfolioDarkMode"))} themeDefault={getCookie("kalvinPortfolioTheme")} palettePresets={customPalettes} setDarkModeCookie={setDarkModeCookie} setThemeCookie={setThemeCookie}>
                        <PalettePicker />
                        {children}
                    </Themer>
                </body>
            </html>
    );
}