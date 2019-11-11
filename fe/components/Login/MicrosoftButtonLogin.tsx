import { SFC } from "react";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import localisation from "../../src/Locales/Localisations";
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
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={onClick}
                    style={{ width: "25rem" }}>
                    <Icon path={mdiWindows}
                        size={1}
                        color="white"
                    />
                    {localisation.login.loginMicrosoft}
                </Button>
            </div>
        </div>
    );
};

export default MicrosoftButtonLogin;
