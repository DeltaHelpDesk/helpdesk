import {FunctionComponent, ChangeEvent, useState} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid } from "@material-ui/core";
import Router from "next/router";
import GroupIcon from "@material-ui/icons/Group";
import AllInboxIcon from "@material-ui/icons/AllInbox";

interface IProps {
    activeTab?: number;
}

const AdminContaier: FunctionComponent<IProps> = ({ activeTab = 0, children }) => {

    const [value, setValue] = useState(activeTab);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);

        if (value === newValue) {
            return;
        }

        setTimeout(() => {
            switch (newValue) {
                case 0:
                    Router.push("/admin");
                    break;
                case 1:
                    Router.push("/admin/users");
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
                    <Tab label="Seznam uživatelů" icon={<GroupIcon />} />
                    {/* <Tab label="Nastavení" />
                    <Tab label="Hardware" /> */}
                </Tabs>
            </Grid>
            <Grid item sm={12}>
                {children}
            </Grid>
        </Grid>

    </>;
};

export default AdminContaier;
