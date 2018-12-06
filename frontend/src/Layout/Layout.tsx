import * as React from 'react';
import Menu from 'src/components/Menu';

const Layout: React.SFC<{}> = props => {
    return(
        <>
            <Menu />
            {props.children}
        </>
    )
}

export default Layout;