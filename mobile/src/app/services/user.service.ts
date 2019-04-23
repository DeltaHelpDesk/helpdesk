import { Injectable } from '@angular/core';
import { EmailAuth_loginEmail } from "../types/types";
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user = new BehaviorSubject<EmailAuth_loginEmail | null>(null);

  constructor(private storage: Storage) {
  }

  async logout(): Promise<void> {
    await this.storage.remove('user');
    this.user.next(null);
  }

  public loginEmail(userData: EmailAuth_loginEmail | null) {
    this.storage.set('user', userData);
    this.user.next(userData);
  }
}
