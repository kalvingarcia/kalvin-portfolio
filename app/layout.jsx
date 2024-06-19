import {NextAppDirEmotionCacheProvider} from "tss-react/next/appDir";

export default function Layout({children}) {
    return (
        <html lang="en">
            <body>
                <NextAppDirEmotionCacheProvider options={{key: "css"}}>
                    {children}
                </NextAppDirEmotionCacheProvider>
            </body>
        </html>
    );
}