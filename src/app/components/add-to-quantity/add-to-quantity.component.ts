import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-to-quantity',
  templateUrl: './add-to-quantity.component.html',
  styleUrls: ['./add-to-quantity.component.css']
})
export class AddToQuantityComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(private dialog: MatDialogRef<AddToQuantityComponent>) {}
  public quantity = 0
  public newQuant(q: number, as: boolean): void {
    var newQuantity = q
    if(as == false) {
      newQuantity = q*-1

    }
    this.dialog.close(newQuantity)
  }
}
