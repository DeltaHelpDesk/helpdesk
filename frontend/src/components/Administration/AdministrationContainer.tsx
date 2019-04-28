import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Administration from "./Administration";

function AdministrationContainer({}) {
  return (
    <div>
      <Grid container={true} direction="row" justify="center" alignItems="center">
        <Administration />
      </Grid>
    </div>
  );
}


export default AdministrationContainer;
