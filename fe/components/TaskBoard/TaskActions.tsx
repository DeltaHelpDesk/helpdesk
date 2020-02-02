import { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";

interface IProps {
    taskId: string;
}

const TaskActions: FunctionComponent<IProps> = ({ taskId }) => {
    const { t } = useTranslation();

    return <>
        <Typography variant="body1">
            {t(locKeys.error.WIP)}
        </Typography>
    </>;
};

export default TaskActions;
