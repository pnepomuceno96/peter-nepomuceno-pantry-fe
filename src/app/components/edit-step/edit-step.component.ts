import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-step',
  templateUrl: './edit-step.component.html',
  styleUrls: ['./edit-step.component.css']
})
export class EditStepComponent implements OnInit, OnChanges {
  ngOnInit(): void {
    this.newStep = this.step
  }
  ngOnChanges(): void {

  }
  constructor(public ui: UiService) {
    
  }
  @Input() step: string =''
  public newStep: string = ''
  private firstLetterCaps(string: string) {
    return string.replace(string, function(txt){return txt.charAt(0).toUpperCase() + txt.substring(1);})
  }

  
  public saveStep(s: string): void {
    const index = this.ui.editSteps.indexOf(this.step)
    for(let i = 0; i < this.ui.editSteps.length; i++) {
      if(i == index) {
        console.log("index true")
        this.ui.editSteps[i] = this.firstLetterCaps(s)
      }
    }
    console.log(this.ui.editSteps)
  }

  public deleteStep(): void {
    const index = this.ui.editSteps.indexOf(this.step)
    this.ui.editSteps.splice(index, 1)
  }
  
    
}
