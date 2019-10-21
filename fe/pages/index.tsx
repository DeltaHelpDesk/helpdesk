import * as React from 'react';
import Link from 'next/link';
import Layout from '../components/Layouts/Layout';
import { NextPage } from 'next';
import HomePage from '../components/Homepage/HomePage';
import HeadComponent from '../components/Layouts/HeadComponent';

const IndexPage: NextPage = () => {
    return (
            <Layout title="Home">
                <HomePage />
            </Layout>
    )
}

export default IndexPage;
