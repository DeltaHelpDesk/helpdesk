import * as React from 'react';
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Icon from '@mdi/react';
import { mdiWindows } from '@mdi/js'
import classNames from "classnames";

const styles = (theme: Theme) => ({
  margin: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },

});

interface IMicrosoftButtonLoginProps extends WithStyles<string> {
  onClick: () => void
}


const MicrosoftButtonLogin: React.SFC<IMicrosoftButtonLoginProps> = props => {
  const { classes, onClick } = props;
  return (
    <div>
      <div>
        <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={onClick}>
          <Icon path={mdiWindows} className={classNames(classes.leftIcon, classes.iconSmall)}
            size={1}
            color="white"
          />
          Přihlásit
        </Button>
      </div>
    </div>
  );
}


export default withStyles(styles)(MicrosoftButtonLogin);
