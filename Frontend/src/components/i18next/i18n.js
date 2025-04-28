import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import locales
import enTranslation from './en';
import esTranslation from './es';
import frTranslation from './fr';
import spTranslation from "./sp"

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        'translation': enTranslation
    },
    es: {
        'translation': esTranslation
    },
    fr: {
        'translation': frTranslation
    },
    sp: {
        'translation': spTranslation
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "sp",
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;