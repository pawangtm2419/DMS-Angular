import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOnPowerComponent } from './edit-on-power.component';

describe('EditOnPowerComponent', () => {
  let component: EditOnPowerComponent;
  let fixture: ComponentFixture<EditOnPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOnPowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOnPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
