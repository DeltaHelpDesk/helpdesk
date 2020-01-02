import { Component } from "react";
import Layout from "../components/Layouts/Layout";
import TaskBoard from "../components/TaskBoard/TaskBoard";
import { withAuthSync } from "../src/auth/authWrapper";
import { UserRole } from "../src/graphql/graphql-global-types";

// tslint:disable-next-line:no-empty-interface
interface IProps {

}

class Board extends Component<IProps> {

    render() {
        return <>
            <Layout title="Board">
                <div className="no-select">
                    <TaskBoard />
                </div>
            </Layout>
        </>;
    }
}

export default withAuthSync(Board, UserRole.ADMIN);
