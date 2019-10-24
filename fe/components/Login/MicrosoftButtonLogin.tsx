import { SFC } from "react";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@mdi/react";
import { mdiWindows } from "@mdi/js";

interface IMicrosoftButtonLoginProps {
    onClick: () => void;
}

const MicrosoftButtonLogin: SFC<IMicrosoftButtonLoginProps> = ({ onClick }) => {
    return (
        <div>
            <div>
                <Button variant="contained" size="large" color="primary" onClick={onClick}>
                    <Icon path={mdiWindows}
                        size={1}
                        color="white"
                    />
                    Přihlásit
                </Button>
            </div>
        </div>
    );
};

export default MicrosoftButtonLogin;
