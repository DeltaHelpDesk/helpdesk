import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import MainAppBar from '../MainAppBar/MainAppBar'

type Props = {
    title?: string
}

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = 'Helpdesk',
}) => (
        <div>
            <Head>
                <title>{title} - Helpdesk</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="stylesheet" href="static/static.css" />
                <link rel="stylesheet" href="static/bootstrap.css" />
                <link rel="stylesheet" href="static/mdb.css" />
            </Head>
            <header>
                <MainAppBar />
            </header>
            <div style={{marginTop: '10rem'}}>
                {children}

            </div>
        </div>
    )

export default Layout;
