import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Icon from '@mdi/react';
import { mdiWindows } from '@mdi/js'
import classNames from "classnames";




const styles = (theme: Theme) => ({
    margin: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },

});

function ButtonSizes(props: any) {
    const { classes } = props;
    return (
        <div>
            <div>
                <Button variant="contained" size="large" color="primary" className={classes.margin}>
                    <Icon path={mdiWindows} className={classNames(classes.leftIcon, classes.iconSmall)}
                        size={1}
                        color="white"
                    />
                    Přihlásit
                 </Button>
            </div>
        </div>
    );
}

ButtonSizes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSizes);
