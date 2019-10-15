import * as React from "react";
import Layout from "../components/Layouts/Layout";
import TaskBoard from "../components/TaskBoard/TaskBoard";
import { UserRole } from "../src/graphql/auth";
import { withAuthSync } from "../src/auth/authWrapper";

// tslint:disable-next-line:no-empty-interface
interface IProps {

}

class Board extends React.Component<IProps> {

    render() {
        return <>
            <Layout title={'Board'}>
                <div className={"no-select"}>
                    <TaskBoard />
                </div>
            </Layout>
        </>;
    }
}

export default withAuthSync(Board, UserRole.ADMIN);
