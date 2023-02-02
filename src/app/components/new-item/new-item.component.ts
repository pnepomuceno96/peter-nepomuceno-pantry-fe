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

  public measurements = ['cups', 'tsps', 'tbsps', 'pints', 'slices', 'N/A']
  public updateMeasurement(m: string) {
    this.selectedMeasurement =  m
  }

  private titleCase(string: string): string {
    /* 
    This looks for all matches of any number of word and 
    non-whitespace characters(via a regex), and returns the 
    same string but with each first character in uppercase.
    */
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();})
  }

  public postItem(name: string, image: string) {
    if(name != '' && image != '' && this.selectedMeasurement != '' && this.quantity > 0 && this.calories != null && this.weight != null && this.weight > 0) {
    this.newItem.name = this.titleCase(name)
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
  } else {
    this.ui.showError("Incomplete fields.")
  }
  }

}
