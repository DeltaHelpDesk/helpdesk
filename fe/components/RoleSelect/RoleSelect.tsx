import { FunctionComponent, ChangeEvent } from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
import { useState } from "react";
import { UserRole, State } from "../../src/graphql/graphql-global-types";

interface IProps {
    onSelected?: (admin: UserRole) => void;
    currentRole: UserRole;
}

const RoleSelect: FunctionComponent<IProps> = ({
    onSelected = null,
    currentRole,
}) => {

    const [selected, setSelected] = useState<string>(currentRole);

    const handleChange = (event: ChangeEvent<{ value: UserRole }>) => {
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
