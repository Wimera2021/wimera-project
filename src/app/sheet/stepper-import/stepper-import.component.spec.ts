import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperImportComponent } from './stepper-import.component';

describe('StepperImportComponent', () => {
  let component: StepperImportComponent;
  let fixture: ComponentFixture<StepperImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
