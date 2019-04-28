import * as React from 'react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';

// USE THIS FOR REFERENCE
// https://material-ui.com/guides/typescript/

const styles = (theme: Theme) => createStyles({
    root: {
        color: theme.palette.primary.dark,
    },
    subheader: {
        color: theme.palette.secondary.light,
        textAlign: "center"
    }
})


interface IStylesExampleProps extends WithStyles<typeof styles> {
    name: string
}

const StylesExample: React.SFC<IStylesExampleProps> = props => {
    const { classes } = props;
    return(
        <div>
            <h1 className={classes.root}>Example component</h1>
            <h2>hello {props.name}</h2>
            <h3 className={classes.subheader}>with material-ui custom styles</h3>
        </div>
    )
}


export default withStyles(styles)(StylesExample);