import * as React from "react";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


interface IProps {
    isLinear?: boolean,
    linearWidth?: string
}

const CircularIndeterminate = () => {
    return (
        <div>
            <CircularProgress />
        </div>
    );
}


export default CircularIndeterminate;