import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class UserIdService {

  constructor() {

  }
  userID = "";
  setMyGlobalVar(value) {
     this.userID = value;
   }

   getUserID() {
     return this.userID;
   }



}
