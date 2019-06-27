import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs-compat/Subject';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  private callContent = new Subject<any>();

  contentComponentCalled$ = this.callContent.asObservable(); // subscribe to this in content.component in the constructor 

  getAccounts() {
    return this.http.get('../assets/accounts.json');
  }

  // This method is called from header.component
  displayAccounts() {
    this.callContent.next();
  }
}
