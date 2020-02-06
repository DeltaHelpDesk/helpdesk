import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useState, useEffect, ChangeEvent, FunctionComponent } from "react";
import Router from "next/router";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
// import localisation, { ILangOption, langs } from "../../src/Locales/Localisations";
import mainTheme from "../Themes/MainTheme";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";

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

interface ILang {
    name: string;
    key: string;
}

const LanguageSelect: FunctionComponent = () => {
    const languages: ILang[] = [
        {
            name: "Čestina",
            key: "cs",
        },
        {
            name: "English",
            key: "en",
        },
    ];

    const { t, i18n: { changeLanguage } } = useTranslation(null, { useSuspense: false });
    const [lang, setLanguage] = useState<ILang>(languages[0]);

    const classes = useStyles(mainTheme);

    // useEffect(() => {
    //     const langInfo = localisation.getLanguage();
    //     console.log(langInfo);
    //     const currentLang = langs.find((x) => x.lang === langInfo);
    //     setLanguage(currentLang);
    // }, []);

    const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        const l = languages.find((x) => x.key === value);

        console.log(l.key);
        changeLanguage(l.key, () => {
            console.log("test");
        });
        setLanguage(l);

        // setTimeout(() => {
        //     Router.reload();
        // }, 500);
    };

    return <>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label" shrink>{t(locKeys.settings.languageSelect)}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                value={lang.key}
                onChange={handleChange}>
                {languages.map((l, i) => <MenuItem value={l.key} key={i}>{l.name}</MenuItem>)}
            </Select>
        </FormControl>
    </>;
};

export default LanguageSelect;
