import * as Msal from "msal";
// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/README.md

export default class MicrosoftAuthService {
    app: Msal.UserAgentApplication;
    applicationConfig: Msal.Configuration;
    loginRequest: Msal.AuthenticationParameters;

    constructor() {
        this.applicationConfig = {
            auth: {
                clientId: "12a2525e-d4a2-45fb-9020-0809921a1503",
            },
        };
        this.loginRequest = {
            scopes: ["user.read", "mail.send"],
        };

        this.app = new Msal.UserAgentApplication(this.applicationConfig);
        this.app.handleRedirectCallback((error, response) => {
          //  this.authCallback(error.message || "Chyba", response.idToken, error, response.tokenType);
        });
    }

    authCallback(errorDesc, token, error, tokenType) {
        if (token) {
            console.log("CALLBACK", token);
        } else {
            console.log(error + ":" + errorDesc);
        }
    }

    login = async () => {
        try {
            const response = await this.app.loginRedirect(this.loginRequest);
            const user = this.app.getAccount();
            if (user) {
                return user;
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    logout = () => {
        this.app.logout();
    }

    getToken = async () => {
        try {
            const accessToken = await this.app.acquireTokenSilent(this.loginRequest);
            return accessToken;
        } catch (error) {
            try {
                const accessToken1 = await this.app
                    .acquireTokenPopup(this.loginRequest);
                return accessToken1;
            } catch (err) {
                console.error(err);
            }
        }
    }
}

// export default class GraphService {
//     constructor() {
//         this.graphUrl = 'https://graph.microsoft.com/v1.0/';
//     }
//     getUserInfo = token => {
//         const headers = new Headers({ Authorization: `Bearer ${token}` });
//         const options = {
//             headers
//         };
//         return fetch(`${this.graphUrl}/me`, options)
//             .then(response => response.json())
//             .catch(response => {
//                 throw new Error(response.text());
//             });
//     };
// }
