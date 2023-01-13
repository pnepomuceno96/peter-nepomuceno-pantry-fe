import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

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

  public attemptLogin(username: string, password: string) {
    this.username = username
    this.password = password
    this.ui.loadUser(this.username, this.password)
  }
}
