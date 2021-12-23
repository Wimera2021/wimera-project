import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvReviewtableComponent } from './sv-reviewtable.component';

describe('SvReviewtableComponent', () => {
  let component: SvReviewtableComponent;
  let fixture: ComponentFixture<SvReviewtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvReviewtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvReviewtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
