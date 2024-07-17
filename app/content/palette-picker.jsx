"use client"
import {useEffect, useState, useCallback} from "react";
import {setCookie} from 'cookies-next';
import {useThemeContext, useDarkModeContext, tss} from "../source/components/themer";
import {ContainerContextProvider, useContainerContext} from "../source/helper/container";
import Drawer from "../source/components/drawer";
import IconButton from "../source/components/icon-button";

const cookieOptions = {
    domain: "kalvingarcia.com", 
    maxAge: 3156000000,
    sameSite: true,
    secure: true
}

const useStyles = tss.create(({theme, open}) => ({
    picker: {
        margin: "auto",
        position: "relative",
        width: "100%",
        maxWidth: 1280
    },
    palettes: {
        position: "relative",
        height: "100%",
        width: "calc(100% - 50px)",
        overflowY: "hidden",
        overflowX: "auto",
        display: "flex",
        gap: 10
    },
    card: {
        paddingTop: 10,
        gap: 10,
        height: "100%",
        width: "100%",
        minWidth: 150,
        maxWidth: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 20,
        overflow: "hidden",
        opacity: 0.5,
        backgroundColor: theme.primary.accent.hex(),
        color: theme.primary.onAccent.hex(),
        transition: "opacity 300ms ease",
        "&.current": {
            opacity: 1
        },
        "&:hover": {
            opacity: 1
        }
    },
    palette: {
        height: "100%",
        width: "100%",
        display: "flex",

        "& .color": {
            height: "100%",
            width: "100%"
        }
    },
    theme: {
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 1000
    },
    scheme: {
        position: "absolute",
        top: 80,
        right: 20
    }
}));

function PaletteCard({name, current, palette, ...props}) {
    const {cx, classes} = useStyles();
    return (
        <div  className={cx(classes.card, current? "current" : "")} {...props}>
            {name.replace(/_/g, ' ').replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())}
            <div className={classes.palette}>
                {Object.entries(palette).map(([role, color]) => <div key={role} className={"color"} style={{backgroundColor: color}}/>)}
            </div>
        </div>
    );
}

export default function PalettePicker() {
    const {role, type} = useContainerContext();
    const {theme, palettes, changeTheme} = useThemeContext();
    const {darkMode, toggleDarkMode} = useDarkModeContext();
    const [open, setOpen] = useState(false);

    const handleDarkMode = useCallback(() => {
        setCookie("kalvinPortfolioDarkMode", !darkMode, cookieOptions);
        toggleDarkMode();
    }, [darkMode]);
    const handleTheme = useCallback(themeName => {
        setCookie("kalvinPortfolioTheme", themeName, cookieOptions);
        changeTheme(themeName);
    }, [darkMode]);

    const {classes} = useStyles({open});
    return (
        <ContainerContextProvider role={open? "primary" : role} type={open? "accent" : type} >
            <section className={classes.picker}>
                <Drawer height={200} open={open} setOpen={setOpen}>
                    <div className={classes.palettes}>
                        {Object.entries(palettes).map(([name, palette]) => <PaletteCard key={name} name={name} current={theme.name === name} palette={palette} onClick={() => handleTheme(name)} />)}
                    </div>
                    <IconButton className={classes.scheme} role="neutral" appearance="outlined" icon={darkMode? "dark_mode" : 'light_mode'} onClick={handleDarkMode} />
                </Drawer>
                <IconButton className={classes.theme} appearance={open? "filled" : "outlined"} icon="palette" onClick={() => setOpen(!open)} />
            </section>
        </ContainerContextProvider>
    );
}