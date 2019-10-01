import * as React from 'react';

const MainAppBar: React.FunctionComponent<{}> = () => {


    return <>
        <AppBar position="fixed" >
            <Toolbar className="flex-direction-column">
                <Typography variant="h6" className={classes.grow}>
                    <NavLink className={classes.firstItem} to="/"><img className={classes.menuLogo} src={logo} /></NavLink>
                </Typography>
                <div className={classes.parent}>
                    <div className={classes.hamburger} onClick={() => { this.setState({ isActive: !this.state.isActive }); this.help(); }}>
                        <span className={`${classes.line} ${classes.line1} ${classes.lineOneInactive}`} />
                        <span className={`${classes.line} ${classes.line2} ${classes.lineTwoInactive}`} />
                        <span className={`${classes.line} ${classes.line3} ${classes.lineThreeInactive}`} />
                    </div>
                </div>
                <div className={`${classes.navItems} ${this.state.isActive ? "is-active" : ""}`}>
                    <NavLink className={classes.menuItem} to="/admin">{'Administration'}</NavLink>
                    <NavLink className={classes.menuItem} to="/tasklist">{'Tasklist'}</NavLink>
                    <NavLink className={classes.menuItem} to="/form">{'New task'}</NavLink>
                </div>
                <AuthContext.Consumer>{({ logout, user }) =>
                    user && (
                        <div>
                            {/* <span>{user.fullName}</span> */}
                            <UserLogged logout={logout} user={user} />
                            {/* <Button onClick={logout}>Odhlásit se</Button> */}
                        </div>
                    )
                }</AuthContext.Consumer>
            </Toolbar>
        </AppBar></>;
}

export default MainAppBar;