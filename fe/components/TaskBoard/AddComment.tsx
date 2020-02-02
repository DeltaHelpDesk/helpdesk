import { FunctionComponent } from "react";
import { useMutation } from "react-apollo";
import { AddComment, AddCommentVariables } from "../../src/graphql/types/AddComment";
import { addComment } from "../../src/graphql/mutations";
import { Grid, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";

interface IProps {
    taskId: string;
    onAdd?: () => void;
}

const AddCommentComponent: FunctionComponent<IProps> = ({ taskId, onAdd = null }) => {

    const [message, setMessage] = useState<string>("");
    const [addComm] = useMutation<AddComment>(addComment);

    const minMsgLength = 5;
    const maxMsgLength = 120;

    const { t } = useTranslation();

    const handleTextChange = (text: string): void => {
        setMessage(text);
    };

    const handleSend = async (): Promise<void> => {
        if (message.length < minMsgLength || message.length > maxMsgLength) {
            return;
        }

        const vars: AddCommentVariables = { taskId, message };

        await addComm({ variables: vars });

        if (onAdd) {
            onAdd();
        }

        handleTextChange("");
    };

    return <>
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
                <TextField
                    id="outlined-multiline-static"
                    label={t(locKeys.task.addComment)}
                    multiline
                    fullWidth
                    rows="5"
                    value={message}
                    onChange={(e) => { handleTextChange(e.currentTarget.value); }}
                    variant="outlined"
                    error={message.length > 0 && (message.length < minMsgLength || message.length > maxMsgLength)}
                    helperText={
                        message.length > 0 && message.length < minMsgLength
                            ? `${t(locKeys.error.msgTooShort)}`
                            : message.length > maxMsgLength
                                ? `${t(locKeys.error.msgTooLong)} (${maxMsgLength})`
                                : `${message.length}/${maxMsgLength}`
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={message.length < minMsgLength || message.length > maxMsgLength}
                    onClick={(_) => {
                        setMessage(message);
                        handleSend();
                    }} >
                    Přidat
                </Button>
            </Grid>
        </Grid>
    </>;
};

export default AddCommentComponent;
