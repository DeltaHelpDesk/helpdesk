import Layout from "../components/Layouts/Layout";
import { NextPage } from "next";
import NewTask from "../components/NewTask/NewTask";
import NewTaskContainer from "../components/NewTask/NewTaskContainer";

const NewtaskPage: NextPage = () => {
    return (
        <Layout title="New">
            <NewTaskContainer />
            {/* <NewTask /> */}
        </Layout>
    );
};

export default NewtaskPage;
