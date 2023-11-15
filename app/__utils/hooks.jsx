import * as React from 'react';
import Themer from './style/themer';

/**
 * 
 * @returns A tuple containing two functions for getting the current theme and changing the theme.
 */
export function useTheme() {
    const [currentTheme, setCurrentTheme] = React.useState(Themer.currentTheme);

    /**
     * 
     */
    const themeGenerator = React.useMemo((currentTheme, mode) => {
        //
        const lightness_mappings = {
            "light": {
                "accent_color": {
                    "accent": 30, "on_accent": 90, "container": 80, "on_container": 10,
                },
                "neutral_color": {
                    "container_lowest": 90, "container_lower": 88, "container": 86, "container_higher": 84, "container_highest": 80, 
                    "on_container": 10, "outline": 50, "shadow": 30,
                },
            },
            "dark": {
                "accent_color": {
                    "accent": 80, "on_accent": 20, "container": 30, "on_container": 90,
                },
                "neutral_color": {
                    "container_lowest": 10, "container_lower": 14, "container": 16, "container_higher": 18, "container_highest": 20,
                    "on_container": 90, "outline": 60, "shadow": 0,
                },
            }
        };

        /**
         * 
         */
        const augmentColors = (color, mode, neutral = false) => {
            augmentation = {};

            if(neutral)
                for(const mapping of ["container_lowest", "container_lower", "container", "container_higher", "container_highest", "on_container", "outline", "shadow"])
                    augmentation[mapping] = color(lightness_mappings[mode].neutral_color[mapping]);
            else
                for(const mapping of ["accent", "on_accent", "container", "on_container"])
                    augmentation[mapping] = color(lightness_mappings[mode].accent_color[mapping]);

            return augmentation;
        };
        /**
         * 
         */
        const getCodeColors = () => ({
            "string": currentTheme.palette.secondary(40),
            "keyword": currentTheme.palette.primary(40),
            "comment": currentTheme.palette.tertiary(70),
            "type": currentTheme.palette.secondary(40),
            "literal": currentTheme.palette.tertiary(40),
            "punctuation": currentTheme.palette.tertiary(10),
            "plaintext": currentTheme.palette.tertiary(10),
            "tag": currentTheme.palette.primary(40),
            "attribute_name": currentTheme.palette.secondary(30),
            "attribute_value": currentTheme.palette.secondary(20),
            "decimal": currentTheme.palette.secondary(40),
            "line_numbers": currentTheme.palette.tertiary(10)
        });

        return {
            palette: {
                primary: augmentColors(currentTheme.palette.primary, mode),
                secondary: augmentColors(currentTheme.palette.secondary, mode),
                tertiary: augmentColors(currentTheme.palette.tertiary, mode),
                neutral: augmentColors(currentTheme.palette.neutral, mode, true),
                error: augmentColors(currentTheme.palette.error, mode),
                code: getCodeColors()
            },
            typography: {
                display: currentTheme.typography.display(),
                headline: currentTheme.typography.headline(),
                title: currentTheme.typography.title(),
                subtitle: currentTheme.typography.subtitle(),
                body: currentTheme.typography.body(),
                label: currentTheme.typography.label(),
                code: currentTheme.typography.code()
            }
        };
    }, [lightnessMappings]);

    const getTheme = React.useMemo(mode => ({
        ...themeGenerator(currentTheme, mode)
    }), [currentTheme]);

    const addTheme = React.useCallback((name, theme) => {
        Themer.addTheme(name, theme);
    }, []);

    const changeTheme = React.useMemo(name => {
        setCurrentTheme(Themer.changeTheme(name));
    }, []);

    return [getTheme, addTheme, changeTheme];
}