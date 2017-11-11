import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTypeListComponent } from './appointment-type-list.component';

describe('AppointmentTypeListComponent', () => {
  let component: AppointmentTypeListComponent;
  let fixture: ComponentFixture<AppointmentTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
