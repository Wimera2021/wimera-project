import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvHeaderComponent } from './sv-header.component';

describe('SvHeaderComponent', () => {
  let component: SvHeaderComponent;
  let fixture: ComponentFixture<SvHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
