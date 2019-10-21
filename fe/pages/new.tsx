import * as React from 'react';
import Link from 'next/link';
import Layout from '../components/Layouts/Layout';
import { NextPage } from 'next';
import LoginPageComponent from '../components/Login/Login';
import NewTask from '../components/NewTask/NewTask';

const LoginPage: NextPage = () => {
    return (
        <Layout title="New">
            <NewTask />
        </Layout>
    )
}

export default LoginPage;
