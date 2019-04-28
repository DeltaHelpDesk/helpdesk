import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-xhr-backend';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: 'cs',
        fallbackLng: 'cs',
        defaultNS: 'translations',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        backend: {
            loadPath: `${process.env.REACT_APP_LOCALIZATION_ENDPOINT}/{{lng}}/{{ns}}`,
            crossDomain: true,
        },
        react: {
            useSuspense: false
        }
    });

export default i18n;