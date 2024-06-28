import Local from "next/font/local";
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
    const palettes = {default: {primary: pink, secondary: thistle, tertiary: celadon, error: cordovan, neutral: raisin}};
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