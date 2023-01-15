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
  
  @Input() step: Step
  
  //public stepIndex = this.ui.steps.indexOf(this.step)
  public addStep(): void {
    this.ui.steps.push({} as Step)
    console.log(this.ui.steps)
  }

  public updateStep(s: string): void {
    this.step.step = s
  }

  


}
