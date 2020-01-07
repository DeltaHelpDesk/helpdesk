import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
import { useState } from "react";
import { getAdmins, getAdmins_admins } from "../../src/graphql/types/getAdmins";
import { getAdminsQuery } from "../../src/graphql/queries";
import { useQuery } from "react-apollo";
import Skeleton from "@material-ui/lab/Skeleton";

interface IProps {
    helperText?: string;
    title?: string;
    onSelected?: (admin: getAdmins_admins) => void;
    selectOneText?: string;
}

const RoleSelect: React.FunctionComponent<IProps> = ({
    helperText = "",
    onSelected = null,
    title = "Select admin",
    selectOneText = "Select one",
}) => {

    const [selected, setSelected] = useState<string>("");

    const { loading, data, error } = useQuery<getAdmins>(getAdminsQuery);

    if (loading) {
        return <>
            <Skeleton variant="text" />
        </>;
    }

    if (error) {
        return <>
            {error}
        </>;
    }

    const { admins } = data;

    const handleChange = (event: React.ChangeEvent<{ value: string }>) => {

        const selectedValue = event.target.value;
        setSelected(selectedValue);

        const selectedAdmin = admins.find(({ id }) => id === selectedValue);

        if (onSelected) {
            onSelected(selectedAdmin);
        }
    };

    return <>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">{title}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selected}
                onChange={handleChange}
            >
                <MenuItem value="" disabled>
                    <em>
                        {selectOneText}
                    </em>
                </MenuItem>
                {
                    admins.map(({ fullName, id }) => <MenuItem value={id}>
                        {fullName}
                    </MenuItem>)
                }
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    </>;
};

export default RoleSelect;
