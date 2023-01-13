import { Component } from '@angular/core';
import { Page } from 'src/data/Pages';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peter-nepomuceno-pantry-fe';
  public page = Page
  constructor(public ui: UiService) {}
}
