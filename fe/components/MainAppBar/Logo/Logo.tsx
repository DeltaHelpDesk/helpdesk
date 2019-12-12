import * as React from "react";
import DateHelper from "../../../utils/dateHelper";
import { Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    menuLogo: {
        padding: "5px 0px",
        maxHeight: "70px",
    },
}));

const Logo: React.FunctionComponent<{}> = () => {
    const dateHelper = new DateHelper();

    const isXmasTime = dateHelper.isChristmasTime();

    const isPrideMonth = dateHelper.isPrideMonth();

    const defaultLogo = (!isXmasTime && !isPrideMonth);

    const styles = useStyles({});

    return <>
        <Link href="/">
            <div style={{ cursor: "pointer" }}>
                {defaultLogo && <img src="/static/logos/logo_new.png" className={styles.menuLogo} />}
                {isPrideMonth && <img src="/static/logos/logo_new.png" className={styles.menuLogo} />}
                {isXmasTime && <img src="/static/logos/christmas_logo.png" className={styles.menuLogo} />}
            </div>
        </Link>
    </>;
};

export default Logo;
