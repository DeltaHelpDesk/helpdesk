import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layouts/Layout";
import { NextPage } from "next";
import LoginPageComponent from "../components/Login/Login";
import Head from "next/head";
import localisation from "../src/Locales/Localisations";

const LoginPage: NextPage = () => {
    return <>
        <Layout title={localisation.login.login}>
            <div className={"pt-5"}>
                <LoginPageComponent showPassword={false} user={null} />
            </div>
        </Layout>
    </>;
};

export default LoginPage;
