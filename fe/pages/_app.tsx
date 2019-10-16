import App from 'next/app';
import { AuthContext } from '../src/graphql/auth';
import MainRouter from '../src/Router';
import fetch from 'node-fetch';

class HelpDeskApp extends App<{}> {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }


        return { pageProps };
    }

    render() {
        // @ts-ignore
        global.fetch = fetch;

        const { Component, pageProps } = this.props;

        return (
            <AuthContext.Provider >
                <Component {...pageProps} />
            </AuthContext.Provider>
        );

        // return (
        //     <AuthContext.Provider>
        //         <MainRouter />
        //     </AuthContext.Provider>
        // );
    }

}

export default HelpDeskApp;

