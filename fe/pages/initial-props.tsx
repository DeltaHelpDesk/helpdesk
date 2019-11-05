import { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layouts/Layout";
import List from "../components/List";
import { IDemoUser } from "../interfaces";
import { findAll } from "../utils/sample-api";

interface IProps {
    items: IDemoUser[];
    pathname: string;
}

const WithInitialProps: NextPage<IProps> = ({ items, pathname }) => (
    <Layout title="List Example (as Functional Component) | Next.js + TypeScript Example">
        <h1>List Example (as Function Component)</h1>
        <p>You are currently on: {pathname}</p>
        <List items={items} />
        <p>
            <Link href="/">
                <a>Go home</a>
            </Link>
        </p>
    </Layout>
);

WithInitialProps.getInitialProps = async ({ pathname }) => {
    // Example for including initial props in a Next.js function compnent page.
    // Don't forget to include the respective types for any props passed into
    // the component.
    const items: IDemoUser[] = await findAll();

    return { items, pathname };
};

export default WithInitialProps;
