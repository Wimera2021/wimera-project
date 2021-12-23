import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCellsComponent } from './add-cells.component';

describe('AddCellsComponent', () => {
  let component: AddCellsComponent;
  let fixture: ComponentFixture<AddCellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCellsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
