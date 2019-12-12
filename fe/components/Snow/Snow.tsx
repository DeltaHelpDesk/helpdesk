import S from "react-snow-effect";
import DateHelper from "../../utils/dateHelper";

const Snow: React.FunctionComponent<{}> = () => {

    const dateHelper = new DateHelper();
    const isChristmasTime = dateHelper.isChristmasTime();

    if (!isChristmasTime) {
        return <></>;
    }

    return <S />;
};

export default Snow;
