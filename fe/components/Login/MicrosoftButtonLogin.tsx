import { SFC } from "react";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import localisation from "../../src/Locales/Localisations";
import Button from "@material-ui/core/Button";
import Icon from "@mdi/react";
import { mdiWindows } from "@mdi/js";

interface IMicrosoftButtonLoginProps {
    onClick: () => void;
    className?: string;
}

const MicrosoftButtonLogin: SFC<IMicrosoftButtonLoginProps> = ({ onClick, className = null }) => {
    return (
        <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={onClick}
            className={className}>
            <Icon path={mdiWindows}
                size={1}
                color="white"
            />
        </Button>
    );
};

export default MicrosoftButtonLogin;
