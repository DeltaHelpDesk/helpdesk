import dynamic from "next/dynamic";

const SnowComponent = dynamic<{}>(() => import("./Snow"),
    { ssr: false });

export default SnowComponent;
