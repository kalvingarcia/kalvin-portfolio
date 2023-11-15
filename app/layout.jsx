'use client';
import * as React from 'react';
import Script from 'next/script';
import {createTheme} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import ThemeRegistry from './__components/theme-registry';
import {ColorModeContext, ChangeThemeContext} from './__utils/contexts';
import {useTheme} from './__utils/hooks';

export default function RootLayout({ children }) {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(() => ({
        toggleColorMode: () => setMode(prevMode => prevMode === 'light'? 'dark' : 'light')
    }), []);

    const [getTheme, _, changeTheme] = useTheme();
    const theme = React.useMemo(() => createTheme(getTheme(mode)), [mode, getTheme]);
    return (
        <html lang="en">
            <head>

            </head>
            <body className="portfolio-body">
                <ColorModeContext.Provider value={colorMode}>
                <ChangeThemeContext.Provider value={changeTheme}>
                    <ThemeRegistry theme={theme} options={{key: 'mui'}}>
                        <CssBaseline enableColorScheme />
                        {children}
                    </ThemeRegistry>
                </ChangeThemeContext.Provider>
                </ColorModeContext.Provider>
            </body>
            <Script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js" />
        </html>
    )
}