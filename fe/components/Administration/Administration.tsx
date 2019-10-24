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
    return <>
        <Grid item={true}>
            <Card className={"d-flex justify-content-center align-items-center admin-card"}>
                <p className="h4-responsive">Nastavení</p>
            </Card>
        </Grid>
        <Grid item={true}>
            <Card className={"d-flex justify-content-center align-items-center admin-card"}>
                <p className="h4-responsive">Seznam požadavků</p>
            </Card>
        </Grid>
        <Grid item={true}>
            <Card className={"d-flex justify-content-center align-items-center admin-card"}>
                <p className="h4-responsive">Hardware</p>
            </Card>
        </Grid>
        <Grid item={true}>
            <Link href={customRoutes.userList}>
                <Card className={"d-flex justify-content-center align-items-center admin-card"}>
                    <p className="h4-responsive">Seznam uživatelů</p>
                </Card>
            </Link>
        </Grid>

    </>;
};

export default AdministrationItems;
