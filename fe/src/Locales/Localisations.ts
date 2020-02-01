import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
import englishLang from "./Lang/English";
import czechLang from "./Lang/Czech";

export interface ILS extends LocalizedStringsMethods, ILocalisedStrings {

}

export interface ILocalisedStrings {
    common: ILocalisedCommon;
    userType: ILocalisedUserType;
    task: ILocalisedTasks;
    taskState: ILocalisedTaskState;
    login: ILocalisedLogin;
    tips: ILocalisedTips;
    error: ILocalisedErrors;
    settings: ILocalisedSettings;
}

interface ILocalisedCommon {
    welcome: string;
    subtitleHomepage: string;
    settings: string;
    administration: string;
    newTask: string;
    noResponse: string;
    noTask: string;
    description: string;
    comments: string;
    issueDescription: string;
    issuePlaceholder: string;
    asigneeTitle: string;
    selectAsignee: string;
    subject: string;
}

interface ILocalisedUserType {
    SUPERADMIN: string;
    ADMIN: string;
    DEFAULT: string;
}

interface ILocalisedTasks {
    sendNew: string;
    taskList: string;
    newTask: string;
    addComment: string;
    addTicket: string;
    addNewTicket: string;
    showDetail: string;
    selectTask: string;
    deleteComment: string;
    deleteConfirm: string;
    cancel: string;
    accept: string;
    state: string;
    actions: string;
    author: string;
    asignee: string;
    createdAt: string;
    success: string;
}

interface ILocalisedTaskState {
    UNRESOLVED: string;
    SOLVING: string;
    SOLVED: string;
    changed: string;
}

interface ILocalisedLogin {
    login: string;
    loginGoogle: string;
    loginFacebook: string;
    loginMicrosoft: string;
    logout: string;
    title: string;
    email: string;
    password: string;
    showPassword: string;
}

interface ILocalisedTips {
    loginSafety: string;
    didYouKnow: string;
}

interface ILocalisedErrors {
    sorry: string;
    anErrorHasOccured: string;
    errorOnClient: string;
    errorCodeOccured: string;
    msgTooShort: string;
    textTooShort: string;
    msgTooLong: string;
    textTooLong: string;
    undefinedError: string;
    WIP: string;
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
