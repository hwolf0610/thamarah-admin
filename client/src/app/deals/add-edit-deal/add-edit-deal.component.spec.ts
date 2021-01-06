import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDealComponent } from './add-edit-deal.component';

describe('AddEditDealComponent', () => {
  let component: AddEditDealComponent;
  let fixture: ComponentFixture<AddEditDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditDealComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
