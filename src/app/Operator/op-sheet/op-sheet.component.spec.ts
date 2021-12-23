import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpSheetComponent } from './op-sheet.component';

describe('OpSheetComponent', () => {
  let component: OpSheetComponent;
  let fixture: ComponentFixture<OpSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
