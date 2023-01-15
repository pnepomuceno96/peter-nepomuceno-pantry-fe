import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiService } from 'src/app/services/ui.service';
import { Item } from 'src/data/Item';
import { ItemDTO } from 'src/DTOs/ItemDTO';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit{
  ngOnInit(): void {
    
  }
  

  constructor(public ui: UiService, private dialog: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item) {}

  // private newItem = {} as ItemDTO
  // public id = this.data.id
  
  public selectedMeasurement = ""
  public measurements = ['cups', 'tsps', 'tbsps', 'pints', 'slices', 'N/A']
  public updateMeasurement(m: string) {
    this.selectedMeasurement = m
  }

  public cancel() {
    this.dialog.close()
  }

  public newProperties(name: string, image: string) {
    this.data.name = name
    this.data.image = image
    this.data.measurement = this.selectedMeasurement
    this.ui.updateItem(this.data)
    this.dialog.close()
  }
  
}
