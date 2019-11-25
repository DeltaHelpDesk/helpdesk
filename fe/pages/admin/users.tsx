import { NextPage } from "next";
import Layout from "../../components/Layouts/Layout";
import UserListContainer from "../../components/Administration/UserList/UserListContainer";

const UserListPage: NextPage = () => {
    return (
        <Layout title="User list">
            <UserListContainer />
        </Layout>
    );
};

export default UserListPage;
