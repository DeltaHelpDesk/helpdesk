import * as React from 'react';
import Link from 'next/link';
import Layout from '../components/Layouts/Layout';
import { NextPage } from 'next';
import LoginPageComponent from '../components/Login/Login';

const LoginPage: NextPage = () => {
    return (
        <Layout title="Login">
            {/* TODO: Params from URL to 'user' */}
            <LoginPageComponent showPassword={false} user={null} />
        </Layout>
    )
}

export default LoginPage;
