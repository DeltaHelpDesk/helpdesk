import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
import englishLang from "./Lang/English";
import czechLang from "./Lang/Czech";

export interface ILS extends LocalizedStringsMethods, ILocalisedStrings {

}

export interface ILocalisedStrings {
    common: ILocalisedCommon;
    task: ILocalisedTasks;
    login: ILocalisedLogin;
    error: ILocalisedErrors;
    settings: ILocalisedSettings;
}

interface ILocalisedCommon {
    welcome: string;
    subtitleHomepage: string;
    settings: string;
}

interface ILocalisedTasks {
    sendNew: string;
    taskList: string;
    newTask: string;
}

interface ILocalisedLogin {
    login: string;
    logout: string;
    title: string;
    email: string;
    password: string;
    showPassword: string;
}

interface ILocalisedErrors {
    sorry: string;
    anErrorHasOccured: string;
    errorOnClient: string;
    errorCodeOccured: string;
}

interface ILocalisedSettings {
    title: string;
    languageSelect: string;
    themeSelect: string;
    language: string;
    theme: string;
    dark: string;
    light: string;
}

export interface ILangOption {
    lang: "en" | "cs";
    name: "English" | "Čeština";
}

export const langs: ILangOption[] = [
    {
        lang: "en",
        name: "English",
    },
    {
        lang: "cs",
        name: "Čeština",
    },

];

const localisation: ILS = new LocalizedStrings({
    en: englishLang,
    cs: czechLang,
});

export default localisation;
