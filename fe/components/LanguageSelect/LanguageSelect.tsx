import * as React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useState, useEffect, useRef } from "react";
import Router from "next/router";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import localisation, { ILangOption, langs } from "../../src/Locales/Localisations";
import mainTheme from "../Themes/MainTheme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const LanguageSelect: React.FunctionComponent = () => {

    const [language, setLanguage] = useState<ILangOption>({ lang: "cs", name: "Čeština" });

    const classes = useStyles(mainTheme);

    useEffect(() => {
        const langInfo = localisation.getLanguage();
        console.log(langInfo);
        const currentLang = langs.find((x) => x.lang === langInfo);
        setLanguage(currentLang);
    }, []);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        const l = langs.find((x) => x.lang === value);

        localisation.setLanguage(l.lang);
        setLanguage(l);

        setTimeout(() => {
            Router.reload();
        }, 500);
    };

    const { name, lang } = language;

    return <>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label" shrink>{localisation.settings.languageSelect}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                value={lang}
                onChange={handleChange}>
                {langs.map((l, i) => <MenuItem value={l.lang} key={i}>{l.name}</MenuItem>)}
            </Select>
        </FormControl>
    </>;
};

export default LanguageSelect;
