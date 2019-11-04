import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../src/graphql/auth";
import UserLogged from "./UserLogged";
import customRoutes from "../../src/Routes";
import localisation from "../../src/Locales/Localisations";
import PersonIcon from '@material-ui/icons/Person';

const MainAppBar: React.FunctionComponent<{}> = () => {

    return <>
        <AppBar position="fixed" >
            <Toolbar >
                <img src="/static/logo_new.png" />
                <div className={"d-flex justify-content-end"} style={{ width: "100%" }}>
                    <div className={"d-flex justify-content-around align-items-center"} style={{ width: "25vw" }}>
                        <div>
                            <Link href="/admin"><Button variant="contained" >Administration</Button></Link>

                        </div>
                        <div>
                            <Link href={customRoutes.taskBoard}><Button variant="contained">Task list</Button></Link>
                        </div>
                        <div>
                            <Link href={customRoutes.newTask}><Button variant="contained">New task</Button></Link>

                        </div>
                        <div>
                            <AuthContext.Consumer>{({ logout, user }) =>
                                user
                                    ? (
                                        <div>
                                            {/* <span>{user.fullName}</span> */}
                                            <UserLogged logout={logout} user={user} />
                                            {/* <Button onClick={logout}>Odhlásit se</Button> */}
                                        </div>
                                    )
                                    : (
                                        <div>
                                            {/* <span>{user.fullName}</span> */}
                                            <Link href={customRoutes.loginRoute}>
                                                <Button variant="contained">
                                                    <PersonIcon />
                                                    {localisation.login.login}
                                                </Button>
                                            </Link>
                                            {/* <Button onClick={logout}>Odhlásit se</Button> */}
                                        </div>
                                    )

                            }</AuthContext.Consumer>
                        </div>
                    </div>
                </div>

            </Toolbar>
        </AppBar></>;
};

export default MainAppBar;
