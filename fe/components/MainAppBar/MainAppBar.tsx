import * as React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from 'next/link';
import { Button } from '@material-ui/core';

const MainAppBar: React.FunctionComponent<{}> = () => {


    return <>
        <AppBar position="fixed" >
            <Toolbar className="flex-direction-column">
                <Typography variant="h6" >
                    {/* <Link href="/"><img  src={logo} /></Link> */}
                </Typography>
               
                <div>
                    <Link href='/admin'><Button variant="contained" >Administration</Button></Link>
                    <Link href='/admin'><Button variant="contained">Task list</Button></Link>
                    <Link href='/admin'><Button variant="contained">New task</Button></Link>
                </div>
               
            </Toolbar>
        </AppBar></>;
}

export default MainAppBar;