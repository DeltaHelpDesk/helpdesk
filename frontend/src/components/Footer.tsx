import * as PropTypes from "prop-types";
import * as React from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = {
    root: {
        width: "100%",
        backgroundColor: "black",
        color: "white",
        height: "60px",
        position: "fixed" as "fixed",
        left: 0,
        bottom: 0,
        botton: "0px",
        textAlign: "center" as "center"
    }
};

function Footer(props: any) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <p>Helpdesk</p> <p>Copyright @2018</p>
        </div>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
