import * as React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import Layout from '../../components/Layouts/Layout';
import AdministrationContainer from '../../components/Administration/AdministrationContainer';

const AdminPage: NextPage = () => {
    return (
        <Layout title="Admin">
            <AdministrationContainer />
        </Layout>
    )
}

export default AdminPage;
