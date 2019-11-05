import { FunctionComponent } from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

interface IProps {
    isLinear?: boolean;
    linearWidth?: string;
}

const Loading: FunctionComponent<IProps> = ({ isLinear = false, linearWidth = "30rem" }) => {
    return (
        <div className="d-flex" style={{ height: "100%", width: "100%" }}>
            <div className={"flex-center flex-column"}>
                {
                    isLinear
                        ? <LinearProgress color="primary" variant="indeterminate" style={{ minWidth: linearWidth }} />
                        : <CircularProgress />
                }

            </div>
        </div>
    );
};

export default Loading;
