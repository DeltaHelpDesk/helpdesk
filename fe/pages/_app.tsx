import App from "next/app";
import { AuthContext } from "../src/graphql/auth";
import fetch from "node-fetch";
import { ApolloProvider } from "react-apollo";
import client from "../src/graphql/client";
import HeadComponent from "../components/Layouts/HeadComponent";
import theme from "../src/theme";
import { MuiThemeProvider } from "@material-ui/core";
import ThemeContainer from "../components/Themes/ThemeProvider";
import ScrollButton from "../components/ScrollTop/ScrollTop";
import SnowComponent from "../components/Snow/SnowComponent";
import "../src/i18n";
import { SnackbarProvider } from "notistack";

class HelpDeskApp extends App<{}> {

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }

    render() {
        // @ts-ignore
        global.fetch = fetch;

        // tslint:disable-next-line: no-string-literal
        if (!global["XMLHttpRequest"]) {
            // @ts-ignore
            global.XMLHttpRequest = require("xhr2");
        }

        const { Component, pageProps } = this.props;

        return <>
            <SnowComponent />
            <HeadComponent>
                <ScrollButton />
                <AuthContext.Provider >
                    <ApolloProvider client={client}>
                        <ThemeContainer>
                            <SnackbarProvider maxSnack={3}>
                                <Component {...pageProps} />
                            </SnackbarProvider>
                        </ThemeContainer>
                    </ApolloProvider>
                </AuthContext.Provider>
            </HeadComponent>
        </>;
    }

}

export default HelpDeskApp;
