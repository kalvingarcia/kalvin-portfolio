"use client"
import Local from "next/font/local";
import {getCookie} from "cookies-next";
import {useEffect, useState} from "react";
import {GlobalStyles} from "tss-react";
import Themer from "./source/components/themer";

const kalvinIconsFont = Local({
    variable: "--kalvin-icons",
    src: [{
        path: "../public/fonts/KalvinIcons.woff",
        weight: "400",
        style: "normal"
    }]
});

export default function Layout({children}) {
    const [isClient, setIsClient] = useState(false);
    const [customPalettes, setCustomPalettes] = useState({});
    useEffect(() => {
        (async () => {
            setCustomPalettes(await fetch("./palettes.json").then(response => response.json()));
            setIsClient(true);
        })();
    }, []);

    const prerenderDefaults = {
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
    return (
            <html lang="en" className={kalvinIconsFont.variable}>
                <body>
                    <GlobalStyles styles={prerenderDefaults} />
                    {isClient?
                        <Themer darkModeDefault={(/true/i).test(getCookie("kalvinPortfolioDarkMode"))} themeDefault={getCookie("kalvinPortfolioTheme")} palettePresets={customPalettes}>
                            {children}
                        </Themer>
                        :
                        ""
                    }
                </body>
            </html>
    );
}