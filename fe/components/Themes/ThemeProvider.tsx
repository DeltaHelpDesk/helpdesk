import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, useMediaQuery, Fade } from '@material-ui/core';
import { Transition } from 'react-transition-group';



const ThemeContainer: React.FunctionComponent<{}> = ({ children }) => {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const dark: boolean = true;

    const mainTheme = createMuiTheme({
        palette: {
            type: dark ? 'dark' : 'light',
            primary: {
                main: '#40a351'
            },
        },
    });


    return <>
        <ThemeProvider theme={mainTheme}>
            {children}
        </ThemeProvider>
    </>;
}

export default ThemeContainer;