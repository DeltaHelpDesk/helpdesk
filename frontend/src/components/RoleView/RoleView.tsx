import * as React from 'react';

interface IProps {
    role: string;
}

const RoleView: React.FunctionComponent<IProps> = props => {
    let roleIcon: string;
    switch (props.role) {
        case "ADMIN" :
           roleIcon ="../image_admin.svg";
            break;
        case "SUPERADMIN" :
            roleIcon ="../image_superadmin.svg";
            break;
        default:
            roleIcon ="../image_user.svg";
            break;

    }
    return <div><img src={roleIcon}/></div>;

}

export default RoleView;