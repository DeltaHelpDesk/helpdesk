import { Fade, makeStyles, Theme, createStyles } from "@material-ui/core";
import { useEffect, useState, FunctionComponent } from "react";
import getTheme from "../Themes/MainTheme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tipBar: {
            overflowWrap: "anywhere",
        },
        tipBox: {
            padding: "1rem",
            paddingLeft: "2rem",
            borderRadius: "1em",

            margin: "1rem",
            width: "26.5em",

            borderLeft: "#40a351 solid 10px",
        },
        heading: {
            margin: "0px",
            marginBottom: "5px",
        }
    }));

const TipBar: FunctionComponent = () => {

    const classes = useStyles(getTheme());

    const [tip , setTip] = useState<string>("");

    const tips: string[] = [
        "...přihlášení přes sociální sítě je naprosto bezpečné? Přístup k vašim údajům vůbec nedostaneme!",
        "...při vývoji helpdesku nebylo ublíženo žádnému zvířeti?",
        "...si náš nejmenovaný kolega polil klávesnici pivem? Upadl na třetím schodu...",
        "...helpdesk si pamatuje všechna vaše rozhodnutí? Příběh vám vyprávěný je jen jeden z mnoha.",
        "...paní Bulánková má dvě dcery? Kupodivu ani jednu z nich zatím nezabila...",
    ];

    useEffect(() => {
        const k = tips[Math.floor(Math.random() * tips.length)];
        setTip(k);
    },[]);

    return <>
        <Fade in={true}>
            <div className={classes.tipBox}>
                <h2 className={classes.heading}>
                    Věděli jste, že...
                </h2>
                <div className={classes.tipBar}>
                    {tip}
                </div>
            </div>
        </Fade>
    </>;
};

export default TipBar;