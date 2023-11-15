import * as React from 'react';
import Script from 'next/script';
import {createTheme} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {Inter} from 'next/font/google';

import ThemeRegistry from './__components/theme-registry';
import {ColorModeContext, ChangeThemeContext} from './__utils/contexts';
import {useTheme} from './__utils/hooks';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: "Kalvin's Porfolio",
    description: "Here you'll find all of Kalvin Garcia's work and projects. You can also find Kalvin's resume and contact information!",
};

export default function RootLayout({ children }) {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(() => ({
        toggleColorMode: () => setMode(prevMode => prevMode === 'light'? 'dark' : 'light')
    }), []);

    const [getTheme, _, changeTheme] = useTheme();
    const theme = React.useMemo(() => createTheme(getTheme(mode)), [mode, getTheme]);
    return (
        <html lang="en">
            <body className={inter.className}>
                <ColorModeContext.Provider value={colorMode}>
                <ChangeThemeContext.Provider value={changeTheme}>
                    <ThemeRegistry theme={theme} options={{key: 'mui'}}>
                        <CssBaseline enableColorScheme />
                        {children}
                    </ThemeRegistry>
                </ChangeThemeContext.Provider>
                </ColorModeContext.Provider>
                <Script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js" />
            </body>
        </html>
    )
}