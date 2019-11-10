import { FunctionComponent, Component } from "react";
import SocialLogin, { ISocialLoginProps } from "react-social-login";
import { Button, Link } from "@material-ui/core";

class SocialButton extends Component<ISocialLoginProps> {
    render() {
        return (
            <Link onClick={this.props.triggerLogin} {...this.props}>
                {this.props.children}
            </Link>
        );
    }
};

export default SocialLogin(SocialButton);
