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
import getTheme from "../Themes/MainTheme";

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

    const [theme, setTheme] = useState<string>("dark");

    const classes = useStyles(getTheme());

    useEffect(() => {
        const currentTheme = cookieHelper.getThemeName();
        setTheme(currentTheme);
    }, []);

    const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;

        cookieHelper.setTheme(value);
        setTheme(value);

        setTimeout(() => {
            Router.reload();
        }, 500);

    };

    return <>
        <FormControl className={classes.formControl}>
            <InputLabel id="select-theme-helper-label" shrink>{localisation.settings.themeSelect}</InputLabel>
            <Select
                labelId="select-theme-helper-label"
                id="select-theme"
                value={theme}
                onChange={handleChange}>
                <MenuItem value="dark" key="0">Dark</MenuItem>
                <MenuItem value="light" key="1">Light</MenuItem>
            </Select>
        </FormControl>
    </>;
};

export default DarkModeSelect;
