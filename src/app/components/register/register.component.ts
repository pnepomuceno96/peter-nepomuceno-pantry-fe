import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { AppUser } from 'src/data/AppUser';
import { Credentials } from 'src/data/Credentials';
import { AppUserDTO } from 'src/DTOs/AppUserDTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {}
  private newUser = {} as Credentials

  public register(username: string, password: string) {
    if(username != '' && password != '') {
    this.newUser.username = username
    this.newUser.password = password
    this.ui.signUp(this.newUser)
    this.ui.goHome()
    } else {
      this.ui.showError("Incomplete fields.")
    }
  }
}
