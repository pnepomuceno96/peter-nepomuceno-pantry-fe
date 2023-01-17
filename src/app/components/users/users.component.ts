import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { AppUser } from 'src/data/AppUser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {
    this.users = ui.users
  }

  public users: AppUser[] = []
}
