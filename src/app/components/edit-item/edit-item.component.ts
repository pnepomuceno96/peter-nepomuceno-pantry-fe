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
    @Inject(MAT_DIALOG_DATA) public data: Item) {
      this.updatedWeight = this.data.weight
      this.updatedCalories = this.data.calories
      this.selectedMeasurement = this.data.measurement
    }

  // private newItem = {} as ItemDTO
  // public id = this.data.id
  
  public selectedMeasurement = ''
  public measurements = ['cups', 'tsps', 'tbsps', 'pints', 'slices', 'N/A']
  public updateMeasurement(m: string) {
    this.selectedMeasurement = m
  }

  public updatedWeight = 0
  public updatedCalories = 0

  public cancel() {
    this.dialog.close()
  }

  private titleCase(string: string): string {
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();})
  }

  public newProperties(name: string, image: string) {
    if(name != '' && image != '' && this.selectedMeasurement != '' && this.updatedWeight != null 
    && this.updatedCalories != null) {
    this.data.name = this.titleCase(name)
    this.data.image = image
    if(this.selectedMeasurement == "N/A") {
      this.data.measurement = ""
    } else {
      this.data.measurement = this.selectedMeasurement
    }
    this.data.weight = this.updatedWeight
    this.data.calories = this.updatedCalories
    
    this.ui.updateItem(this.data)
    this.dialog.close()
  } else {
    this.ui.showError("Incomplete fields.")
  }
  }
  
}
