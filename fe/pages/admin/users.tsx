import { NextPage } from "next";
import Layout from "../../components/Layouts/Layout";
import UserListContainer from "../../components/Administration/UserList/UserListContainer";
import AdminContaier from "../../components/Administration/AdminContainer/AdminContainer";

const UserListPage: NextPage = () => {
    return (
        <Layout title="User list">
            <AdminContaier activeTab={1}>
                <UserListContainer />
            </AdminContaier>
        </Layout>
    );
};

export default UserListPage;
