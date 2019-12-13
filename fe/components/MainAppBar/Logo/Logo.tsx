import { FunctionComponent } from "react";
import DateHelper from "../../../utils/dateHelper";
import { Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    menuLogo: {
        padding: "5px 0px",
        maxHeight: "70px",
    },
}));

const Logo: FunctionComponent<{}> = () => {
    const dateHelper = new DateHelper();

    const isXmasTime = dateHelper.isChristmasTime();

    const isPrideMonth = dateHelper.isPrideMonth();

    const styles = useStyles({});

    const url = isPrideMonth ? "/static/logos/logo_new.png" :
                isXmasTime ? "/static/logos/christmas_logo.png" :
                /* Default */ "/static/logos/logo_new.png";

    return <>
        <Link href="/">
            <div style={{ cursor: "pointer" }}>
                <img src={url} className={styles.menuLogo} />
            </div>
        </Link>
    </>;
};

export default Logo;
