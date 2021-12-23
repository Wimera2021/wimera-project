import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpDashboardComponent } from './op-dashboard.component';

describe('OpDashboardComponent', () => {
  let component: OpDashboardComponent;
  let fixture: ComponentFixture<OpDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
