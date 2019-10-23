import * as React from "react";
import Layout from "../components/Layouts/Layout";
import { NextPage } from "next";
import HomePage from "../components/Homepage/HomePage";

const IndexPage: NextPage = () => {
    return (
        <Layout title="Home">
            <HomePage />
        </Layout>
    );
};

export default IndexPage;
