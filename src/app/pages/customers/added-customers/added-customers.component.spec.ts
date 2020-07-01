import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedCustomersComponent } from './added-customers.component';

describe('AddedCustomersComponent', () => {
  let component: AddedCustomersComponent;
  let fixture: ComponentFixture<AddedCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
