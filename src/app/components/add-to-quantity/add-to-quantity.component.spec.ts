import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToQuantityComponent } from './add-to-quantity.component';

describe('AddToQuantityComponent', () => {
  let component: AddToQuantityComponent;
  let fixture: ComponentFixture<AddToQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
