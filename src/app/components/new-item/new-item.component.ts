import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Item } from 'src/data/Item';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService) {}

  private newItem = {} as Item
  public selectedMeasurement = ""
  public quantity = 0
  public calories = 0
  public weight = 0

  public measurements = ['cups', 'tsps', 'tbsps', 'pints', 'N/A']

  public postItem(name: string, image: string, measurement: string) {
    this.newItem.name = name
    this.newItem.image = image
    if(this.newItem.measurement = "N/A"){
      this.newItem.measurement = ""
    } else {
      this.newItem.measurement = measurement
    }
    this.newItem.quantity = this.quantity
    this.newItem.calories = this.calories
    this.newItem.weight = this.weight
    this.ui.postItem(this.newItem)
    
    this.ui.goHome()
  }

}
