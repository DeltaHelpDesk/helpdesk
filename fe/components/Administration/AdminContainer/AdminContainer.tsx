import { FunctionComponent, ChangeEvent, useState, useContext } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid } from "@material-ui/core";
import Router from "next/router";
import GroupIcon from "@material-ui/icons/Group";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import { ReactAuthContext, userIsAdmin } from "../../../src/graphql/auth";
import customRoutes from "../../../src/Routes";

interface IProps {
    activeTab?: number;
}

const AdminContaier: FunctionComponent<IProps> = ({ activeTab = 0, children }) => {

    const [value, setValue] = useState(activeTab);
    const { user } = useContext(ReactAuthContext);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);

        if (value === newValue) {
            return;
        }

        setTimeout(() => {
            switch (newValue) {
                case 0:
                    Router.push(customRoutes.administration);
                    break;
                case 1:
                    Router.push(customRoutes.userList);
                    break;
            }
        }, 250);
    };

    return <>
        <Grid container direction="column">
            <Grid item sm={12}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="Seznam požadavků" icon={<AllInboxIcon />} />
                    {(userIsAdmin(user)) ?
                        <Tab label="Seznam uživatelů" icon={<GroupIcon />} />
                        : <></>
                    }
                </Tabs>
            </Grid>
            <Grid item sm={12}>
                {children}
            </Grid>
        </Grid>

    </>;
};

export default AdminContaier;
