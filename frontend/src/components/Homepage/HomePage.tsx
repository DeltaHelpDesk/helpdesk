import * as React from "react";
import { Link } from 'react-router-dom';


class HomePage extends React.Component {
    render() {
        return <div>
            <h1>DELTA HELPDESK</h1>
            <h2>Vítejte na stránkách podpory</h2>
            <p>Pokud máte problém zašlete požadavek</p>
            <Link to="/form">
            <p>Poslat požadavek</p>
            </Link>
        </div>;
    }
}
export default HomePage;