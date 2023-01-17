import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCookedRecipeComponent } from './edit-cooked-recipe.component';

describe('EditCookedRecipeComponent', () => {
  let component: EditCookedRecipeComponent;
  let fixture: ComponentFixture<EditCookedRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCookedRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCookedRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
