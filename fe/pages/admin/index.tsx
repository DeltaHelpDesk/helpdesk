import { NextPage } from "next";
import Layout from "../../components/Layouts/Layout";
import { withAuthSync } from "../../src/auth/authWrapper";
import AdminContainer from "../../components/Administration/AdminContainer/AdminContainer";
import BoardContainer from "../../components/TaskBoard/BoardContainer";
import { UserRole } from "../../src/graphql/graphql-global-types";
import { NextPageContext } from "next";
import { Component } from "react";

// tslint:disable-next-line:no-empty-interface
interface IProps {
    taskId?: string;
}

// tslint:disable-next-line: interface-over-type-literal
type RequestQuery = {
    taskId: string,
};
class AdminPage extends Component<IProps> {

    static getInitialProps = async ({ query }: NextPageContext) => {
        console.log(query);
        const taskId: string = query.taskId.toString();
        console.log("taskId", taskId);
        return { taskId };
    }

    render() {
        return (
            <Layout title="Admin">
                <AdminContainer>
                    <BoardContainer taskId={this.props.taskId} />
                </AdminContainer>
            </Layout>
        );
    }
}

export default withAuthSync(AdminPage, UserRole.ADMIN);
