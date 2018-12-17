import * as PropTypes from "prop-types";
import * as React from "react";
import "./styles.css"

import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

const style = {
    footerSpan: {
        color:"lightslategrey"
    },    
};

function Footer(props: any) {
    const { classes } = props;
    return (

        <footer className="footeAnimate">
            <span className={classes.footerSpan}>© 2018 </span>
            <Link className="footerhref" to="/">HelpDesk</Link>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(Footer);
