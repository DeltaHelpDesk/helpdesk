import { Injectable } from '@angular/core';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';

@Injectable()
export class Office365Provider {

  constructor(private msAdal: MSAdal) {
  }

  async login() {
    const authContext: AuthenticationContext = this.msAdal.createAuthenticationContext('https://login.windows.net/common');

    try {
      // TODO: from env
      const authResponse = await authContext.acquireTokenAsync(
        'https://graph.windows.net',
        '12a2525e-d4a2-45fb-9020-0809921a1503',
        'http://localhost:3000/app'
      ) as AuthenticationResult;

      console.log(authResponse.accessToken);
      console.log(authResponse.expiresOn);
    } catch (e) {
      console.warn('Authentication failed', e)
    }
  }

}
