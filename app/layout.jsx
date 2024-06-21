import Themer from "./assets/components/themer";

export default function Layout({children}) {
    return (
        <html lang="en">
            <body>
                <Themer>
                    {children}
                </Themer>
            </body>
        </html>
    );
}