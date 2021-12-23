import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvViewtableComponent } from './sv-viewtable.component';

describe('SvViewtableComponent', () => {
  let component: SvViewtableComponent;
  let fixture: ComponentFixture<SvViewtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvViewtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvViewtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
