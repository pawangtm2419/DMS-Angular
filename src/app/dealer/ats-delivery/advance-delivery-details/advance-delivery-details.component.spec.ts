import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceDeliveryDetailsComponent } from './advance-delivery-details.component';

describe('AdvanceDeliveryDetailsComponent', () => {
  let component: AdvanceDeliveryDetailsComponent;
  let fixture: ComponentFixture<AdvanceDeliveryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceDeliveryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceDeliveryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
