import * as React from 'react';
import { withStyles, Theme, WithStyles, createStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Icon from '@mdi/react';
import { mdiWindows } from '@mdi/js'
import classNames from "classnames";

const styles = (theme: Theme) => createStyles({
  margin: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.primary.contrastText,
  },
  button: {
    margin: "10px 25px",
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    padding: "10px 35px",
    borderRadius: "0px",
    fontWeight: "bold",
    textTransform: "uppercase",
    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
    },
  }

});

interface IMicrosoftButtonLoginProps extends WithStyles<typeof styles> {
  onClick: () => void
}


const MicrosoftButtonLogin: React.SFC<IMicrosoftButtonLoginProps> = props => {
  const { classes, onClick } = props;
  return (
    <div>
      <div>
        <Button variant="contained" size="large" className={classNames(classes.margin, classes.button)} onClick={onClick}>
          <Icon path={mdiWindows} className={classNames(classes.leftIcon)}
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
