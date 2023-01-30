import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { Step } from 'src/data/Step';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(public ui: UiService){
    this.step = this.ui.step
  }
  
  //Step is made an object to be identifiable by the ui service
  @Input() step: Step
  
  //public stepIndex = this.ui.steps.indexOf(this.step)
  public addStep(): void {
    this.ui.steps.push({} as Step)
    console.log(this.ui.steps)
  }

  private firstLetterCaps(string: string) {
    return string.replace(string, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);})
  }
  public updateStep(s: string): void {
    this.step.step = this.firstLetterCaps(s)
  }

  


}
