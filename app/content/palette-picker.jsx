"use client"
import {useEffect, useState} from "react";
import {useThemeContext, useDarkModeContext, tss} from "../source/components/themer";
import {ContainerContextProvider, useContainerContext} from "../source/helper/container";
import Drawer from "../source/components/drawer";
import IconButton from "../source/components/icon-button";

const useStyles = tss.create(({theme, role, type}) => ({
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
        border: `1pt solid ${theme.primary.accent.alpha(0.5).hexa()}`,
        "&.current": {
            opacity: 1,
            border: `1pt solid ${theme.primary.accent.hex()}`
        },
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
    buttons: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 10
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

    const {classes} = useStyles();
    return (
        <ContainerContextProvider role={open? "primary" : role} type={open? "accent" : type} >
            <section className={classes.picker}>
                <Drawer height={200} open={open}>
                    <div className={classes.palettes}>
                        {Object.entries(palettes).map(([name, palette]) => <PaletteCard key={name} name={name} current={theme.name === name} palette={palette} onClick={() => changeTheme(name)} />)}
                    </div>
                </Drawer>
                <div className={classes.buttons}>
                    <IconButton appearance={open? "filled" : "outlined"} icon="palette" onClick={() => setOpen(!open)} />
                    <IconButton role="neutral" appearance="outlined" icon={darkMode? "dark_mode" : 'light_mode'} onClick={toggleDarkMode} />
                </div>
            </section>
        </ContainerContextProvider>
    );
}