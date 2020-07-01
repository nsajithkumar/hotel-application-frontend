import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedAdminsComponent } from './added-admins.component';

describe('AddedAdminsComponent', () => {
  let component: AddedAdminsComponent;
  let fixture: ComponentFixture<AddedAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
