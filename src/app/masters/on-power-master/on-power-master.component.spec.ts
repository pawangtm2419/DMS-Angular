import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnPowerMasterComponent } from './on-power-master.component';

describe('OnPowerMasterComponent', () => {
  let component: OnPowerMasterComponent;
  let fixture: ComponentFixture<OnPowerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnPowerMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnPowerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
