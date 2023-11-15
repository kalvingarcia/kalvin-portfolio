import Palette from './palette';
import Typography from './typography';

const CHINA_ROSE = '#B14E6D';
const CHINESE_VIOLET = '#996680';
const HOOKERS_GREEN = '#718E86';
const BITTERSWEET_SHIMMER = '#BF404F';
const MOUNTBATTEN_PINK = '#85758A';

/**
 * 
 */
export default class Themer {
    static __initialized = false;

    static __currentThemeName = undefined;
    static currentTheme = undefined;
    static __themes = {};

    /**
     * 
     */
    static __initialize() {
        const palette = new Palette(CHINA_ROSE, CHINESE_VIOLET, HOOKERS_GREEN, BITTERSWEET_SHIMMER, MOUNTBATTEN_PINK);
        const typography =  new Typography(1, "rem");
        typography.set_display("'Righteous', sans-serif", 6, 400);
        typography.set_headline("'Dosis', sans-serif", 4.5, 600);
        typography.set_title("'Righteous', sans-serif", 3, 400);
        typography.set_subtitle("'Dosis', sans-serif", 2, 500);
        typography.set_body("'Dosis', sans-serif", 1, 300);
        typography.set_label("'Dosis', sans-serif", 1, 300);
        typography.set_code("'Sono', monospace", 1, 400);
        this.addTheme("kalvin_portfolio", {palette, typography});

        this.__currentThemeName = "kalvin_portfolio";
        this.currentTheme = this.__themes["kalvin_portfolio"];
    }

    /**
     * 
     */
    static addTheme(name, theme) {
        if(this.__themes[name] === undefined)
            this.__themes[name] = theme;
    }

    /**
     * 
     */
    static changeTheme(name) {
        this.__currentThemeName = name;
        this.currentTheme = this.__themes[name];
        return this.currentTheme;
    }
}
Themer.__initialize();