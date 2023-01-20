import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSortHeaderComponent } from './item-sort-header.component';

describe('ItemSortHeaderComponent', () => {
  let component: ItemSortHeaderComponent;
  let fixture: ComponentFixture<ItemSortHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSortHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSortHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
