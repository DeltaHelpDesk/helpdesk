import { FunctionComponent, useState, FormEvent } from "react";
import { IconButton, Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button, InputAdornment } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useSnackbar } from "notistack";
import localisation from "../../src/Locales/Localisations";

interface ILoginProps {
    showPassword: boolean;
    user: IUser;
}

interface IUser {
    password: string;
}

const LastPassword: FunctionComponent<ILoginProps> = ({ showPassword, user: loginVars }) => {

    const [filled, setUser] = useState<IUser>(loginVars);

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const property = e.currentTarget.name;
        const value = e.currentTarget.value;

        setUser({
            ...filled,
            [property]: value,
        });
    };

    return <>
        <TextField
            id="filled[-adornment-password"
            variant="filled"
            type="password"
            name="password"
            autoComplete="current-password"
            label={localisation.login.password}
            value={filled && filled.password || ""}
            onChange={(e) => handleInputChange(e as FormEvent<HTMLInputElement>)}
        />
    </>;
};

export default LastPassword;
