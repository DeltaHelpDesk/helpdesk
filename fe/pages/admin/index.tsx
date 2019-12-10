import { NextPage } from "next";
import Layout from "../../components/Layouts/Layout";
import { UserRole } from "../../src/graphql/auth";
import { withAuthSync } from "../../src/auth/authWrapper";
import AdminContainer from "../../components/Administration/AdminContainer/AdminContainer";
import BoardContainer from "../../components/TaskBoard/BoardContainer";

const AdminPage: NextPage = () => {
    return (
        <Layout title="Admin">
            <AdminContainer>
                    <BoardContainer />
            </AdminContainer>
        </Layout>
    );
};

export default withAuthSync(AdminPage, UserRole.ADMIN);
