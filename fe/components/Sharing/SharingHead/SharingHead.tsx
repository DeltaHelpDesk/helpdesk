import { FunctionComponent } from "react";
import Head from "next/head";

interface IProps {
    title?: string;
    description?: string;
    imageUrl?: string;
}

const SharingHead: FunctionComponent<IProps> = ({ title = "Delta - Helpdesk", description = "",
    imageUrl = "/static/images/favicon/maxresdefault.png" }) => {

    // Must end with '/'
    const deployUrl = "https://delta-nextjs.herokuapp.com/";

    if (imageUrl.startsWith("/")) {
        imageUrl = imageUrl.substr(1, imageUrl.length - 1);
    }

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
