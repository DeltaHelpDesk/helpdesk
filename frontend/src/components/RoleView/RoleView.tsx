import * as React from 'react';

interface IProps {
    role: string;
}

const RoleView: React.FunctionComponent<IProps> = ({role}) => {
    let roleIcon: string;
    switch (role) {
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