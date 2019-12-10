import Layout from "../components/Layouts/Layout";
import { NextPage } from "next";
import HomePage from "../components/Homepage/HomePage";
import HeadComponent from "../components/Layouts/HeadComponent";
import { MuiThemeProvider } from "@material-ui/core";

const IndexPage: NextPage = () => {
    return (
        <Layout title="Home">
            <HomePage />
        </Layout>
    );
};

export default IndexPage;
