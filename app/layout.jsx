import Local from "next/font/local";
import {GlobalStyles} from "tss-react";
import Themer from "./assets/components/themer";

// Default Palette for Kalvin's Portfolio
const pink = "#EDBDDC";
const thistle = "#D2BDD1";
const celadon = "#B2DEBB";
const cordovan = "#96484D";
const raisin = "#34202C";

const kalvinIconsFont = Local({
    variable: "--kalvin-icons",
    src: [{
        path: "./assets/fonts/KalvinIcons.woff",
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
                <Themer presets={palettes}>
                    {children}
                </Themer>
            </body>
        </html>
    );
}