import { FunctionComponent, useState, MouseEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { GetFirstLetters } from "../../utils/TextHelper";
import localisation from "../../src/Locales/Localisations";
import Router from "next/router";
import customRoutes from "../../src/Routes";
import Divider from "@material-ui/core/Divider";
import { Grid, Typography } from "@material-ui/core";

interface ILoggedInProps {
    logout: () => Promise<void> | undefined;
    user: any;
}

const UserLogged: FunctionComponent<ILoggedInProps> = ({ logout, user }) => {

    const { fullName } = user;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <Avatar>{GetFirstLetters(user.fullName)}</Avatar>

        </Button>
        <div style={{ backgroundColor: "#ffffff !important" }}>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ backgroundColor: "#ffffff !important" }}
            >
                <MenuItem style={{ height: "6rem" }}>
                    <Grid>
                        <Grid item>
                            <Grid container={true} justify={"space-around"} alignItems={"center"} spacing={2}>
                                <Grid item={true}>
                                    <Avatar style={{
                                        width: 60,
                                        height: 60,
                                    }}>
                                        {GetFirstLetters(fullName)}
                                    </Avatar>

                                </Grid>
                                <Grid item={true}>
                                    <Typography variant={"h6"}>
                                        {fullName}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { Router.push(customRoutes.settings); }}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={localisation.settings.title} />
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { logout(); }}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={localisation.login.logout} />
                </MenuItem>
            </Menu>
        </div>
    </>;
};

export default UserLogged;
