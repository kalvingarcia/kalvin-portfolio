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

const displayFont = Local({
    variable: "--display-font",
    src: [{
        path: "../public/fonts/Display.woff2",
        weight: "800",
        style: "normal"
    }]
});
const titleFont = Local({
    variable: "--title-font",
    src: [{
        path: "../public/fonts/Title.woff2",
        weight: "600",
        style: "normal"
    }]
});
const headingFont = Local({
    variable: "--heading-font",
    src: [{
        path: "../public/fonts/Heading.woff2",
        weight: "500",
        style: "normal"
    }]
});
const bodyFont = Local({
    variable: "--body-font",
    src: [
        {
            path: "../public/fonts/Body.woff2",
            weight: "200",
            style: "normal"
        },
        {
            path: "../public/fonts/BodyItalic.woff2",
            weight: "200",
            style: "italic"
        },
        {
            path: "../public/fonts/BodyBold.woff2",
            weight: "700",
            style: "normal"
        },
        {
            path: "../public/fonts/BodyBoldItalic.woff2",
            weight: "700",
            style: "italic"
        },
    ]
});
const codeFont = Local({
    variable: "--code-font",
    src: [{
        path: "../public/fonts/Code.woff2",
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
            <html lang="en" className={[kalvinIconsFont.variable, displayFont.variable, titleFont.variable, headingFont.variable, bodyFont.variable, codeFont.variable].join(" ")}>
                <body>
                    <GlobalStyles styles={prerenderDefaults} />
                    {isClient &&
                        <Themer darkModeDefault={(/true/i).test(getCookie("kalvinPortfolioDarkMode"))} themeDefault={getCookie("kalvinPortfolioTheme")} palettePresets={customPalettes}>
                            {children}
                        </Themer>
                    }
                </body>
            </html>
    );
}