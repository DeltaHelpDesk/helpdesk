import * as React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import localisation, { ILangOption, langs } from '../src/Locales/Localisations';
import HeadComponent from '../components/Layouts/HeadComponent';
import { Select, MenuItem } from '@material-ui/core';
import Layout from '../components/Layouts/Layout';

const SettingsPage: React.FunctionComponent = () => {

    const [language, setLanguage] = useState<ILangOption>(null);

    useEffect(() => {
        if (language) return;
        const langInfo = localisation.getLanguage();
        const currentLang = langs.find(x => x.lang == langInfo);
        setLanguage(currentLang);
    });

    const handleLangChange = (lang: string): void => {


        localisation.setLanguage(lang);

        setTimeout(() => {
            Router.push('/');
        }, 500);
    }

    if (!language) {
        return <></>;
    }

    return <>
        <HeadComponent>
            <Layout title="Settings">
                <div className={'d-flex flex-column'}>
                    <h1 className={'h1-responsive'}>{localisation.common.settings}</h1>
                    <div className={'pt-5 pb-5'}>
                        <h2 className={'h2-responsive'}>{localisation.settings.language}</h2>
                        <Select
                            //value={this.state.task.assigne}
                            onChange={e => {
                                const lang: string = e.target.value.toString();
                                handleLangChange(lang)
                            }}
                            value={language}
                            name="language"

                        >
                            <MenuItem value="" disabled={true} selected={true}>
                                <em>Select one</em>
                            </MenuItem>
                            {langs.map((lang, index) => {
                                return (
                                    <MenuItem key={index} value={lang.lang}>
                                        {lang.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>

                    </div>
                </div>
            </Layout>
        </HeadComponent>
    </>;
}

export default SettingsPage;
