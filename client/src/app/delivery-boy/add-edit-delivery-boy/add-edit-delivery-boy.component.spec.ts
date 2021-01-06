import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeliveryBoyComponent } from './add-edit-delivery-boy.component';

describe('AddEditDeliveryBoyComponent', () => {
  let component: AddEditDeliveryBoyComponent;
  let fixture: ComponentFixture<AddEditDeliveryBoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDeliveryBoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDeliveryBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
