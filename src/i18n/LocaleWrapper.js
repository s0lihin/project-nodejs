import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import { CookiesConstant, getCookies, setCookies } from "../services/CookiesService";
import ENGLISH from './language/en.json';
import INDONESIA from './language/id.json';
import { LOCALES } from './Locale';

const Context = React.createContext();
const initLocale = {
    locale: 'en',
    messages: ENGLISH
};

if (getCookies(CookiesConstant.LANGUAGE)) {
    if (getCookies(CookiesConstant.LANGUAGE) === LOCALES.INDONESIA) {
        initLocale.locale = LOCALES.INDONESIA;
        initLocale.messages = INDONESIA;
    }
}

const LocaleWrapper = (props) => {

    const [locale, setLocale] = useState(initLocale.locale);
    const [messages, setMessages] = useState(initLocale.messages);

    function selectLanguage(locale) {
        if (locale === LOCALES.INDONESIA) {
            setLocale(LOCALES.INDONESIA);
            setCookies(CookiesConstant.LANGUAGE, LOCALES.INDONESIA);
            setMessages(INDONESIA);
        } else {
            setLocale(LOCALES.ENGLISH);
            setCookies(CookiesConstant.LANGUAGE, LOCALES.ENGLISH);
            setMessages(ENGLISH);
        }
    }

    return (
        <Context.Provider value={{ locale, selectLanguage }}>
            <IntlProvider
                key={locale}
                locale={locale}
                messages={messages}
                defaultLocale="en" >

                {props.children}

            </IntlProvider>
        </Context.Provider>
    );
}

export { LocaleWrapper, Context as LocaleContext };