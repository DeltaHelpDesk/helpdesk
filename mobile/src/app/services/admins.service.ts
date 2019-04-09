import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { AdminListQuery } from "../queries/admins.query";
import { AdminList } from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  constructor(private apollo: Apollo) {
  }

  public getAdminList() {
    return this.apollo.watchQuery<AdminList>({
      query: AdminListQuery,
    })
  }
}
