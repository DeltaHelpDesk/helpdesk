import * as React from "react";
import Head from "next/head";

interface IProps {
    title?: string;
    description?: string;
    imageUrl?: string;
}

const SharingHead: React.FunctionComponent<IProps> = ({ title = "Delta - Helpdesk", description = "",
    imageUrl = "/static/images/favicon/mstile-144x144.png" }) => {

    const deployUrl = "https://delta-nextjs.herokuapp.com/";

    return <>
        <Head>
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={deployUrl} />
            <meta property="og:image" content={`${deployUrl}${imageUrl}`} />
            <meta property="og:description" content={description} />
        </Head>
    </>;
};

export default SharingHead;
