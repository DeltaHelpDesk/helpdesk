import Layout from "../components/Layouts/Layout";
import { NextPage } from "next";
import HomePage from "../components/Homepage/HomePage";
import HeadComponent from "../components/Layouts/HeadComponent";
import { MuiThemeProvider } from "@material-ui/core";
import SharingHead from "../components/Sharing/SharingHead/SharingHead";

const IndexPage: NextPage = () => {
    return (
        <Layout title="Home">
            <SharingHead />
            <HomePage />
        </Layout>
    );
};

export default IndexPage;
