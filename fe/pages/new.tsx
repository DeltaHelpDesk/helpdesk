import Layout from "../components/Layouts/Layout";
import { NextPage } from "next";
import NewTaskContainer from "../components/NewTask/NewTaskContainer";
import { withAuthSync } from "../src/auth/authWrapper";

const NewtaskPage: NextPage = () => {
    return (
        <Layout title="New">
            <NewTaskContainer />
        </Layout>
    );
};

export default withAuthSync(NewtaskPage);
