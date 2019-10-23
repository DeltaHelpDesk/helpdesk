import { FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Link from "next/link";
import customRoutes from "../../src/Routes";

// tslint:disable-next-line:no-empty-interface
interface IAdministrationItemsProps {
}

const AdministrationItems: FunctionComponent<IAdministrationItemsProps> = () => {
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
            <Link href={customRoutes.userList}>
                <Card >
                    <Grid item={true}>
                        <p>Seznam uživatelů</p>
                    </Grid>
                </Card>
            </Link>
        </div>
    );
};

export default AdministrationItems;
