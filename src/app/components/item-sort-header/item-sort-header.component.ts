import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-item-sort-header',
  templateUrl: './item-sort-header.component.html',
  styleUrls: ['./item-sort-header.component.css']
})
export class ItemSortHeaderComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {}

}
