import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { GetFirstLetters } from 'src/utils/TextHelper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

interface ILoggedInProps {
    logout: () => Promise<void> | undefined,
    user: any,
}

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: '#ffffff'
    },
    paper: {
    },
});

const UserLogged: React.FunctionComponent<ILoggedInProps> = ({ logout, user }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return <>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <Avatar>{GetFirstLetters(user.fullName)}</Avatar>

        </Button>
        <div style={{ backgroundColor: '#ffffff !important' }}>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ backgroundColor: '#ffffff !important' }}
            >

                <MenuItem>{user.fullName}</MenuItem>
                <MenuItem onClick={() => { logout() }}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Odhlásit se" />
                </MenuItem>
            </Menu>
        </div>
    </>;
}

export default withStyles(styles)(UserLogged);