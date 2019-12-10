import { Fade } from "@material-ui/core";
import { useEffect, useState, FunctionComponent } from "react";

const Kaomoji: FunctionComponent = () => {

    const [kaomoji, setKaomoji] = useState<string>("");

    const faces: string[] = [
        "(•_•)",
        "¯\\_(ツ)_/¯",
        "( ´･･)ﾉ",
        "(._.`)",
        "(×_×)",
        "(>。<)",
        "〣( ºΔº )〣",
        "＼(º □ º l|l)/",
        "(・_・;)",
        "(・_・ヾ",
        "ヽ(°〇°)ﾉ",
        "(°ロ°)",
        "╰( ͡° ͜ʖ ͡° )つ",
    ];

    useEffect(() => {
        const k = faces[Math.floor(Math.random() * faces.length)];
        setKaomoji(k);
    });

    return <>
        <Fade in={true}>
            <div className="d-flex justify-content-center">
                <h1 className="display-3">
                    {kaomoji}
                </h1>
            </div>
        </Fade>
    </>;
};

export default Kaomoji;
