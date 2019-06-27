import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Account } from '../account.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  // public account: Account;

  constructor(public accountsService: AccountsService) {
    this.accountsService.contentComponentCalled$.subscribe(
      () => this.loadAccounts()
    )
   }

  data;
  formInfo; 
  account = {
    accountName: '',
    accountNumber: '',
    accountBalance: ''
  }

  isShown = false;
  toggledParagraph: string = "This paragraph is toggled";
  alternativeParagraph: string = "This is an alternative paragraph";

  text: string = "This is some text"; 

  entryForm: FormGroup;

  loadAccounts() {
    console.log(this.data)
    localStorage.setItem('accounts', JSON.stringify(this.data))
  }

  ngOnInit() {
    this.accountsService.getAccounts().subscribe(res => {
      this.data = res['accounts'];
      console.log(this.data)
    });

    this.entryForm = new FormGroup({
      'accountName': new FormControl(null, Validators.required),
      'accountNumber': new FormControl,
      'accountBalance': new FormControl
    })

    this.entryForm.statusChanges.subscribe(
      (status) => this.formInfo = status
    )
  }

  onSubmit() {
    this.account.accountName = this.entryForm.value.accountName;
    this.account.accountNumber = this.entryForm.value.accountNumber;
    this.account.accountBalance = this.entryForm.value.accountBalance;

    console.log(this.formInfo)
    this.entryForm.reset();

    console.log(this.account)
  }

}
