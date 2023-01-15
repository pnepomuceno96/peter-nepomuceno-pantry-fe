import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookedRecipesComponent } from './cooked-recipes.component';

describe('CookedRecipesComponent', () => {
  let component: CookedRecipesComponent;
  let fixture: ComponentFixture<CookedRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookedRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
