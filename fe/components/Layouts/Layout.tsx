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

            </Head>
            <header>
                <MainAppBar />
            </header>
            <div style={{ marginTop: '10rem' }}>
                {children}
            </div>
        </div>
    )

export default Layout;
