import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Item } from 'src/data/Item';
import { ItemDTO } from 'src/DTOs/ItemDTO';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {}

  private newItem = {} as ItemDTO
  public quantity = 0
  public calories = 0
  public weight = 0
  public selectedMeasurement = ""

  public measurements = ['cups', 'tsps', 'tbsps', 'pints', 'N/A']
  public updateMeasurement(m: string) {
    this.selectedMeasurement =  m
  }

  public postItem(name: string, image: string) {
    this.newItem.name = name
    this.newItem.image = image
    if(this.selectedMeasurement == "N/A"){
      this.newItem.measurement = ""
      console.log("na")
    } else {
      this.newItem.measurement = this.selectedMeasurement
    }
    this.newItem.quantity = this.quantity
    this.newItem.calories = this.calories
    this.newItem.weight = this.weight
    this.ui.postItem(this.newItem)
    
    this.ui.goHome()
  }

}
