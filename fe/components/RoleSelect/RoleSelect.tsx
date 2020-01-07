import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
import { useState } from "react";
import { getAdmins, getAdmins_admins } from "../../src/graphql/types/getAdmins";
import { getAdminsQuery } from "../../src/graphql/queries";
import { useQuery } from "react-apollo";
import Skeleton from "@material-ui/lab/Skeleton";
import { UserRole, State } from "../../src/graphql/graphql-global-types";

interface IProps {
    onSelected?: (admin: UserRole) => void;
    currentRole: UserRole;
}

const RoleSelect: React.FunctionComponent<IProps> = ({
    onSelected = null,
    currentRole,
}) => {

    const [selected, setSelected] = useState<string>(currentRole);

    const handleChange = (event: React.ChangeEvent<{ value: UserRole }>) => {
        const state = event.target.value as UserRole;
        setSelected(state);
        if (onSelected) {
            onSelected(state);
        }
    };

    return <>
        <FormControl fullWidth >
            <InputLabel id="state-label">Práva uživatele</InputLabel>
            <Select
                labelId="state-label"
                id="state-select"
                value={selected}
                onChange={handleChange}
                fullWidth
            >
                {
                    Object.values(UserRole).map((x) => <MenuItem key={x} value={x}>{x}</MenuItem>)
                }
            </Select>
        </FormControl>
    </>;
};

export default RoleSelect;
