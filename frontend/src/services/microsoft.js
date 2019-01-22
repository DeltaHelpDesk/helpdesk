import * as Msal from 'msal';
// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-core/README.md

export default class MicrosoftAuthService {
  constructor() {
    this.applicationConfig = {
      clientID: '12a2525e-d4a2-45fb-9020-0809921a1503',
      graphScopes: ['user.read', 'mail.send'],
      responseType: ['id_token']
    };
    this.app = new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      null,
      this.authCallback
    );
  }

  authCallback(errorDesc, token, error, tokenType) {
    if (token) {
      console.log("CALLBACK", token);
    }
    else {
      console.log(error + ":" + errorDesc);
    }
}

  login = () => {
    return this.app.loginPopup(this.applicationConfig.graphScopes).then(
      idToken => {
        const user = this.app.getUser();
        if (user) {
          return user;
        } else {
          return null;
        }
      },
      () => {
        return null;
      }
    );
  };

  logout = () => {
    this.app.logout();
  };

  getToken = () => {
    return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
      accessToken => {
        return accessToken;
      },
      error => {
        return this.app
          .acquireTokenPopup(this.applicationConfig.graphScopes)
          .then(
            accessToken => {
              return accessToken;
            },
            err => {
              console.error(err);
            }
          );
      }
    );
  };
}

// export default class GraphService {
//   constructor() {
//     this.graphUrl = 'https://graph.microsoft.com/v1.0/';
//   }
//   getUserInfo = token => {
//     const headers = new Headers({ Authorization: `Bearer ${token}` });
//     const options = {
//       headers
//     };
//     return fetch(`${this.graphUrl}/me`, options)
//       .then(response => response.json())
//       .catch(response => {
//         throw new Error(response.text());
//       });
//   };
// }

