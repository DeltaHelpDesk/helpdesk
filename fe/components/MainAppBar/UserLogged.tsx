import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { GetFirstLetters } from '../../utils/TextHelper';
import localisation from '../../src/Locales/Localisations';
import Router from 'next/router';
import customRoutes from '../../src/Routes';
import Divider from '@material-ui/core/Divider';

interface ILoggedInProps {
    logout: () => Promise<void> | undefined,
    user: any,
}


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

                <MenuItem style={{height: '6rem'}}>

                    <div className='row align-items-center'>
                        <div className='col-4'>
                            <Avatar>{GetFirstLetters(user.fullName)}</Avatar>
                        </div>
                        <div className='col-8 h6-responsive'>
                            {user.fullName}
                        </div>
                    </div>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { Router.push(customRoutes.settings) }}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={localisation.settings.title} />
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { logout() }}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={localisation.login.logout} />
                </MenuItem>
            </Menu>
        </div>
    </>;
}

export default UserLogged;