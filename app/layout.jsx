import Themer from "./assets/components/themer";
// Default Palette for Kalvin's Portfolio
const pink = "#EDBDDC";
const thistle = "#D2BDD1";
const celadon = "#B2DEBB";
const cordovan = "#96484D";
const raisin = "#34202C";

export default function Layout({children}) {
    const palettes = {default: {primary: pink, secondary: thistle, tertiary: celadon, error: cordovan, neutral: raisin}};
    return (
        <html lang="en">
                <Themer presets={palettes}>
                    {children}
                </Themer>
            </body>
        </html>
    );
}