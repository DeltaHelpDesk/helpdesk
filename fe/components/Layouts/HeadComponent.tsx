import { FunctionComponent } from "react";
import Head from "next/head";

const HeadComponent: FunctionComponent = ({ children }) => {

    return <>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="stylesheet" href="static/static.css" />
            {/* <link rel="stylesheet" href="static/bootstrap.css" /> */}
            {/* <link rel="stylesheet" href="static/mdb.css" /> */}

            <meta name="theme-color" content="#ff6600" />
            <meta name="msapplication-navbutton-color" content="#ff6600" />
            <meta name="apple-mobile-web-app-status-bar-style" content="#ff6600" />
        </Head>

        {children}

    </>;
};

export default HeadComponent;
