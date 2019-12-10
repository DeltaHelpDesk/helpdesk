import Layout from "../components/Layouts/Layout";
import { NextPage } from "next";
import NewTask from "../components/NewTask/NewTask";

const NewtaskPage: NextPage = () => {
    return (
        <Layout title="New">
            <NewTask />
        </Layout>
    );
};

export default NewtaskPage;
