import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
    this.users = ui.userDataSource.filteredData
  }

  public users: AppUser[] = []
}
