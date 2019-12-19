import * as React from "react";
import { useMutation } from "react-apollo";
import { AddComment, AddCommentVariables } from "../../src/graphql/types/AddComment";
import { addComment } from "../../src/graphql/mutations";
import { Grid, Button, TextField } from "@material-ui/core";

interface IProps {
    taskId: string;
    onAdd?: () => void;
}

const AddCommentComponent: React.FunctionComponent<IProps> = ({ taskId, onAdd = null }) => {

    const [message, setMessage] = React.useState<string>("");
    const [addComm] = useMutation<AddComment>(addComment);

    const handleTextChange = (text: string) => {
        setMessage(text);
    };

    const handleSend = () => {
        if (message.length < 5) {
            return;
        }

        const vars: AddCommentVariables = { taskId, message: message };
        addComm({ variables: vars });

        if (onAdd) {
            onAdd();
        }
    };

    return <>
        <Grid container direction="column">
            <Grid item xs={12}>
                <TextField
                    id="outlined-multiline-static"
                    label="Přidat komentář"
                    multiline
                    fullWidth
                    rows="5"
                    value={message}
                    onChange={(e) => { handleTextChange(e.currentTarget.value); }}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={(_) => { handleSend(); }} >
                    Přidat
                </Button>
            </Grid>
        </Grid>
    </>;
};

export default AddCommentComponent;
