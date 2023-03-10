import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { AppUser } from 'src/data/AppUser';
import { AppUserDTO } from 'src/DTOs/AppUserDTO';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {
    this.ui.user = ui.currentUser
    //ui.watchUser().subscribe(user=> {
      if (ui.user != null) {
        this.editUserId = ui.user.id
        this.usernameInput = ui.user?.username
      }
    
  }

  editUserId: string = ''
  public usernameInput: string | undefined
  
  public userRequest = {} as AppUserDTO

  public updateUser(username: string, password: string): void {
    this.userRequest.id = this.editUserId
    if(username != '' && password != '') {
      this.userRequest.username = username
      this.userRequest.password = password
      this.ui.updateUser(this.userRequest)
    } else {
      this.ui.showError("Incomplete fields.")
    }
  }

  public onDelete(): void {
    this.ui.deleteUser(this.ui.currentUser)
    
  }

}
