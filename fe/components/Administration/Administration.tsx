import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import * as React from "react";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';



interface IAdministrationItemsProps {
}

const AdministrationItems: React.FunctionComponent<IAdministrationItemsProps> = () => {
    return (
        <div>
            <Card>
                <Grid item={true}>
                    <p>Nastavení</p>
                </Grid>
            </Card>
            <Card >
                <Grid item={true}>
                    <p>Seznam požadavků</p>
                </Grid>
            </Card>
            <Card >
                <Grid item={true}>
                    <p>Hardware</p>
                </Grid>
            </Card>
            <Link to="/admin/userlist">
                <Card >
                    <Grid item={true}>
                        <p>Seznam uživatelů</p>
                    </Grid>
                </Card>
            </Link>
        </div>
    );
}


export default AdministrationItems;

