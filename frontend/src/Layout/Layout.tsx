import * as React from 'react';
import Menu from 'src/components/Menu';
import Footer from 'src/components/Footer';

const Layout: React.SFC<{}> = props => {
    return(
        <>
            <Menu />
            {props.children}
            <Footer />
        </>
    )
}

export default Layout;