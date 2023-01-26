import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Credentials } from 'src/data/Credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {}

  public username: string = ''
  public password: string = ''

  public credentials = {} as Credentials

  public attemptLogin(username: string, password: string) {
    if(username != '' && password != '') {
    this.credentials.username = username
    this.credentials.password = password
    console.log(this.credentials)
    this.ui.login(this.credentials)
    } else {
    this.ui.showError("Incomplete fields.")
    }
  }
}
