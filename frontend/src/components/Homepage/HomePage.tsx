import * as React from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from "@material-ui/core/Button";

class HomePage extends React.Component<RouteComponentProps> {
    redirectToForm = () => {
        this.props.history.push("/form");
    }
    redirectToLogin = () => {
        this.props.history.push("/login");
    }
    render() {
        return <div>
            <h1>DELTA HELPDESK</h1>
            <h2>Vítejte na stránkách podpory :)</h2>
            <p>Pokud máte problém zašlete požadavek</p>
            <Button onClick={this.redirectToForm} variant="contained" color="primary" className="bluebutton" >Poslat požadavek</Button>
            <p>nebo</p>
            <Button onClick={this.redirectToLogin} variant="contained" color="primary" className="bluebutton" >Přihlásit se</Button>
        </div>;
    }
}
export default withRouter(HomePage); 