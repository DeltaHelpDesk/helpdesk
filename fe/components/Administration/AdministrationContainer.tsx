import { FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Administration from "./Administration";

const AdministrationContainer: FunctionComponent<{}> = () => {
    return (
        <div>
            <Grid container={true} direction="row" justify="center" alignItems="center">
                <Administration />
            </Grid>
        </div>
    );
};

export default AdministrationContainer;
