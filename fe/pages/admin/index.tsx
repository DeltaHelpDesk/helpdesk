import { NextPage } from "next";
import Layout from "../../components/Layouts/Layout";
import AdministrationContainer from "../../components/Administration/AdministrationContainer";
import { UserRole } from "../../src/graphql/auth";
import { withAuthSync } from "../../src/auth/authWrapper";

const AdminPage: NextPage = () => {
    return (
        <Layout title="Admin">
            <AdministrationContainer />
        </Layout>
    );
};

export default withAuthSync(AdminPage, UserRole.ADMIN);
