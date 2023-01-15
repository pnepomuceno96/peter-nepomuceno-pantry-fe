import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookedRecipeComponent } from './cooked-recipe.component';

describe('CookedRecipeComponent', () => {
  let component: CookedRecipeComponent;
  let fixture: ComponentFixture<CookedRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookedRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookedRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
