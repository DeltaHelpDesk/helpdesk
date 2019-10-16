import * as React from 'react';
import Link from 'next/link';
import Layout from '../components/Layouts/Layout';
import { NextPage } from 'next';
import LoginPage from '../components/Login/Login';

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | HelpDesk">
        {/* TODO: Params from URL to 'user' */}
      <LoginPage showPassword={false} user={null} />
    </Layout>
  )
}

export default IndexPage
