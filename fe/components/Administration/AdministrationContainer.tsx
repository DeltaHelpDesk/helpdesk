import { FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Administration from "./Administration";

<<<<<<< refs/remotes/origin/nextJS
const AdministrationContainer: FunctionComponent<{}> = () => {
    return (
        <div>
            <Grid container={true} direction="row" justify="center" alignItems="center">
                <Administration />
            </Grid>
        </div>
    );
};
=======
function AdministrationContainer({}) {
  return (
    <div>
      <Grid container={true} direction="row" justify="space-around" alignItems="center">
        <Administration />
      </Grid>
    </div>
  );
}

>>>>>>> Minor changes

export default AdministrationContainer;
