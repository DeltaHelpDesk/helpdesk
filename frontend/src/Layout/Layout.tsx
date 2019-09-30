import * as React from 'react';
import Menu from 'src/components/Menu/Menu';
import Footer from 'src/components/Footer/Footer';

const Layout: React.SFC<{}> = props => {
    return (
        <>

            <Menu />
            <div style={{marginTop: '6rem'}}>
                {props.children}
            </div>
            <Footer />
        </>
    )
}

export default Layout;