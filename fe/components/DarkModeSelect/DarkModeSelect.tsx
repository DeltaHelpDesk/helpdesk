import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useState, useEffect, FunctionComponent, ChangeEvent } from "react";
import Router from "next/router";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import localisation, { ILangOption, langs } from "../../src/Locales/Localisations";
import mainTheme from "../Themes/MainTheme";
import CookieHelper from "../../utils/cookieHelper";
import { editUser } from "../../src/graphql/mutations";
import getTheme from "../Themes/MainTheme";
import { useMutation } from "react-apollo";
import locKeys from "../../src/Locales/LocalizationKeys";
import { useTranslation } from "react-i18next";

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

const DarkModeSelect: FunctionComponent = () => {
    const cookieHelper = new CookieHelper();
    const [editTheme] = useMutation<
    { theme: string }>(editUser);

    const [theme, setTheme] = useState<string>("dark");

    const classes = useStyles(getTheme());

    useEffect(() => {
        const currentTheme = cookieHelper.getThemeName();
        setTheme(currentTheme);
    }, []);

    const handleChange = async (event: ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        const res = await editTheme({
            variables: {
                theme: value,
            },
        });

        cookieHelper.setTheme(value);
        setTheme(value);

        setTimeout(() => {
            Router.reload();
        }, 500);

    };

    const { t } = useTranslation();

    return <>
        <FormControl className={classes.formControl}>
            <InputLabel id="select-theme-helper-label" shrink>{localisation.settings.themeSelect}</InputLabel>
            <Select
                labelId="select-theme-helper-label"
                id="select-theme"
                value={theme}
                onChange={handleChange}>
                <MenuItem value={t(locKeys.settings.dark)} key="0">{t(locKeys.settings.dark)}</MenuItem>
                <MenuItem value={t(locKeys.settings.light)} key="1">{t(locKeys.settings.light)}</MenuItem>
            </Select>
        </FormControl>
    </>;
};

export default DarkModeSelect;
