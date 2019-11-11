import * as React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import localisation, { ILangOption, langs } from '../../src/Locales/Localisations';
import mainTheme from '../Themes/MainTheme';
import CookieHelper from '../../utils/cookieHelper';

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

const DarkModeSelect: React.FunctionComponent = () => {

    const [dark, setDark] = useState<boolean>(null);

    const darkRef = useRef<string>(null);

    const cookieHelper = new CookieHelper();

    const classes = useStyles(mainTheme);

    useEffect(() => {

        const dark = cookieHelper.getDarkMode();
        setDark(dark);
        darkRef.current = dark ? "dark" : "light";
    });

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;

        console.log(value);

        darkRef.current = value;

        if (value == "light") {
            cookieHelper.setDarkMode(false);
        }
        else {
            cookieHelper.setDarkMode(true);
        }
        setTimeout(() => {
            Router.reload();

        }, 500);




    };

    if (!darkRef.current)
        return <></>;


    return <>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label" shrink>{localisation.settings.languageSelect}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                value={darkRef.current}
                onChange={handleChange}>
                <MenuItem value={"dark"}>Dark</MenuItem>
                <MenuItem value={"light"}>Light</MenuItem>
            </Select>
        </FormControl>
    </>;
}

export default DarkModeSelect;