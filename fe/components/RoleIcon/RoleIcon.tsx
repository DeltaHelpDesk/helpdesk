import * as React from "react";
import { UserRole } from "../../src/graphql/graphql-global-types";
import { Chip } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SecurityIcon from "@material-ui/icons/Security";

interface IProps {
    role: UserRole;
    showText?: boolean;
}

const RoleIcon: React.FunctionComponent<IProps> = ({ role, showText = true }) => {

    let icon: JSX.Element;
    let text: string = "";

    switch (role) {
        case UserRole.ADMIN:
            icon = <VerifiedUserIcon />;
            text = "Admin";
            break;
        case UserRole.DEFAULT:
            icon = <FaceIcon />;
            text = "User";
            break;
        case UserRole.SUPERADMIN:
            icon = <SecurityIcon />;
            text = "Super Admin";
            break;
    }

    if (!showText) {
        return <>
            {icon}
        </>;
    }

    return <>
        <Chip
            size="medium"
            avatar={icon}
            label={text}
        />
    </>;
};

export default RoleIcon;
