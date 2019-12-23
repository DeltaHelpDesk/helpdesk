import { FunctionComponent } from "react";
import Head from "next/head";
import getTheme from "../Themes/MainTheme";

const HeadComponent: FunctionComponent = ({ children }) => {

    const theme = getTheme();

    const primaryColor = theme.palette.primary.main;

    return <>
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta charSet="utf-8" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="stylesheet" href="static/static.css" />
            <link rel="apple-touch-icon" sizes="180x180" href="/static/images/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/static/images/favicon/site.webmanifest" />
            <link rel="mask-icon" href="/static/images/favicon/safari-pinned-tab.svg" color="#40a351" />
            <link rel="shortcut icon" href="/static/images/favicon/favicon.ico" />
            <meta name="msapplication-TileColor" content="#40a351" />
            <meta name="msapplication-config" content="/static/images/favicon/browserconfig.xml" />
            <meta name="theme-color" content={primaryColor} />
            <meta name="msapplication-navbutton-color" content={primaryColor} />
            <meta name="apple-mobile-web-app-status-bar-style" content={primaryColor} />
        </Head>
        {children}
    </>;
};

export default HeadComponent;
