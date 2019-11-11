import Cookies from "universal-cookie";

class CookieHelper {
    static getDefaultTheme = (): string => "dark";

    cookies = new Cookies();

    getThemeName = (): string => {
        const theme = this.cookies.get("theme");
        if (!theme) {
            const setVal = CookieHelper.getDefaultTheme();
            this.setTheme(setVal);
            return setVal;
        }

        return theme;
    }

    setTheme = (theme: string): void => {
        this.cookies.set("theme", theme, { path: "/", maxAge: 60 * 60 * 24 });
    }

}

export default CookieHelper;
