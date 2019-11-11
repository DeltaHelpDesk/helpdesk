import Cookies from "universal-cookie";

class CookieHelper {


    cookies = new Cookies();

    getDarkMode = (): boolean => {
        const dark = this.cookies.get("darkMode");
        console.log('Dark', dark);
        if (dark == null || dark == undefined) {
            this.setDarkMode(false);
            return false;
        }

        return dark;
    }

    setDarkMode = (dark: boolean): void => {
        console.log("Setting dark mode: ", dark);
        this.cookies.set("darkMode", dark, { path: '/', maxAge: 60 * 60 * 24 });
    }

    
}

export default CookieHelper;