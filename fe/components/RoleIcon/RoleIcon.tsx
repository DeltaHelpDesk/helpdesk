import * as React from "react";
import { FunctionComponent, useState, CSSProperties } from "react";
import { UserRole } from "../../src/graphql/graphql-global-types";
import { Chip, Popover, makeStyles, Theme, createStyles, Typography, Grid } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SecurityIcon from "@material-ui/icons/Security";
import getTheme from "../Themes/MainTheme";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        popover: {
            pointerEvents: "none",
        },
        paper: {
            padding: theme.spacing(1),
        },
    }),
);

interface IProps {
    role: UserRole;
    showText?: boolean;
    style?: CSSProperties;
    iconStyle?: CSSProperties;
}

const RoleIcon: FunctionComponent<IProps> = ({ role, showText = true, style = null, iconStyle = null }) => {

    const classes = useStyles(getTheme());
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    let icon: JSX.Element;
    let text: string = "";

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const iStyle = { ...iconStyle, verticalAlign: "middle" };

    const { t } = useTranslation();

    switch (role) {
        case UserRole.ADMIN:
            icon = <VerifiedUserIcon style={iStyle} />;
            text = `${t(locKeys.userType.ADMIN)}`;
            break;
        case UserRole.DEFAULT:
            icon = <FaceIcon style={iStyle} />;
            text = `${t(locKeys.userType.DEFAULT)}`;
            break;
        case UserRole.SUPERADMIN:
            icon = <SecurityIcon style={iStyle} />;
            text = `${t(locKeys.userType.SUPERADMIN)}`;
            break;
    }

    const ic = <Grid item alignItems="center" alignContent="center" onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
        {icon}
    </Grid>;

    if (!showText) {
        return <>
            {ic}
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                style={{ marginTop: "1rem" }}
            >
                <Typography >{text}</Typography>
            </Popover>
        </>;
    }

    return <>
        <Chip
            size="medium"
            avatar={icon}
            label={text}
            style={style}
        />
    </>;
};

export default RoleIcon;
