import App from "next/app";
import { AuthContext } from "../src/graphql/auth";
import fetch from "node-fetch";
import { ApolloProvider } from "react-apollo";
import client from "../src/graphql/client";
import HeadComponent from "../components/Layouts/HeadComponent";
import theme from "../src/theme";
import { MuiThemeProvider } from "@material-ui/core";
import ThemeContainer from "../components/Themes/ThemeProvider";

class HelpDeskApp extends App<{}> {

    // https://github.com/zeit/next.js/blob/master/errors/opt-out-automatic-prerendering.md
    // static async getInitialProps({ Component, ctx }) {
    //     let pageProps = {};
    //     if (Component.getInitialProps) {
    //         pageProps = await Component.getInitialProps(ctx);
    //     }
    //     return { pageProps };
    // }

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

        const { Component, pageProps } = this.props;

        return (
            <HeadComponent>
                <AuthContext.Provider >
                    <ApolloProvider client={client}>
                        <ThemeContainer>
                                <Component {...pageProps} />
                        </ThemeContainer>
                    </ApolloProvider>
                </AuthContext.Provider>
            </HeadComponent>
        );

        // return (
        //     <AuthContext.Provider>
        //         <MainRouter />
        //     </AuthContext.Provider>
        // );
    }

}

export default HelpDeskApp;
