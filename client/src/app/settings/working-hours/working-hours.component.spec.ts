import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHourComponent } from './working-hours.component';

describe('WorkingHourComponent', () => {
  let component: WorkingHourComponent;
  let fixture: ComponentFixture<WorkingHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
