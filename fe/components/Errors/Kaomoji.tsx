import { useEffect, useState, FunctionComponent } from "react";

const Kaomoji: FunctionComponent = () => {

    const [kaomoji, setKaomoji] = useState<string>("");

    const faces: string[] = [
        "(•_•)",
        "¯\\_(ツ)_/¯",
        "( ´･･)ﾉ",
        "(._.`)",
    ];

    useEffect(() => {
        const k = faces[Math.floor(Math.random() * faces.length)];
        setKaomoji(k);
    });

    return <>
        <div className="d-flex justify-content-center">
            <h1 className="display-3">
                {kaomoji}
            </h1>
        </div>
    </>;
};

export default Kaomoji;
