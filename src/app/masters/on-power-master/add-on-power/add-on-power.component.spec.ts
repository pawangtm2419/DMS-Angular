import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnPowerComponent } from './add-on-power.component';

describe('AddOnPowerComponent', () => {
  let component: AddOnPowerComponent;
  let fixture: ComponentFixture<AddOnPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOnPowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
