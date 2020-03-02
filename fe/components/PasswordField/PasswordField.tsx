import * as React from "react";
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface IProps {
    id?: string;
    label: string;
    onChange?: (value: string) => void;
    fullWidth?: boolean;
    ariaLabel?: string;
    isError?: boolean;
}

const PasswordField: React.FunctionComponent<IProps> = ({ onChange, id,
    label, fullWidth = false, ariaLabel, isError = false }) => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (!!onChange) {
            onChange(event.currentTarget.value);
        }
    };

    return <>
        <FormControl fullWidth={fullWidth}>
            <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
            <Input
                id={id || ""}
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                error={isError}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={ariaLabel || ""}
                            onClick={handleClickShowPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    </>;
};

export default PasswordField;
