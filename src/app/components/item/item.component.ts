import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UiService } from 'src/app/services/ui.service';
import { Item } from 'src/data/Item';
import { AddToQuantityComponent } from '../add-to-quantity/add-to-quantity.component';
import { EditItemComponent } from '../edit-item/edit-item.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{
  @Input() item: Item
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService, public dialog: MatDialog, public dialog2: MatDialog) {
    this.item = ui.getItem()
  }

  public openAddDialog(): void {
    const dialog = this.dialog.open(AddToQuantityComponent)

    dialog.afterClosed().subscribe(quantity => {
      if(quantity == 0) {
        return
      } else {
        this.item.quantity += quantity
        this.ui.updateItem(this.item)
      }
    })
  }

  public openEditDialog(): void {
    const editDialog = this.dialog2.open(EditItemComponent, {data: this.item})
    

    
  }



}
