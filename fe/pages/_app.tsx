import * as React from 'react';
import App from 'next/app';
import { AuthContext } from '../src/graphql/auth';
import RouterOutput from '../src/Router';
import fetch from 'node-fetch';

class HelpDeskApp extends App<{}> {

    render() {
        // @ts-ignore
        global.fetch = fetch;


        return (
            <AuthContext.Provider>
                <RouterOutput />
            </AuthContext.Provider>
        );
    }

}

export default HelpDeskApp;

