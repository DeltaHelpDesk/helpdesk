import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, useMediaQuery, Fade } from '@material-ui/core';
import { Transition } from 'react-transition-group';
import getTheme from './MainTheme';




const ThemeContainer: React.FunctionComponent<{}> = ({ children }) => {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');





    return <>
        <ThemeProvider theme={getTheme()}>
            {children}
        </ThemeProvider>
    </>;
}

export default ThemeContainer;