import * as React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import Layout from '../../components/Layouts/Layout';
import UserList from '../../components/Administration/UserList/UserList';

const UserListPage: NextPage = () => {
    return (
        <Layout title="User list">
            <UserList />
        </Layout>
    )
}

export default UserListPage;
