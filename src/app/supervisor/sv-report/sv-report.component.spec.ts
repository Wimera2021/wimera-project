import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvReportComponent } from './sv-report.component';

describe('SvReportComponent', () => {
  let component: SvReportComponent;
  let fixture: ComponentFixture<SvReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
