import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgingFromRecievedComponent } from './aging-from-recieved.component';

describe('AgingFromRecievedComponent', () => {
  let component: AgingFromRecievedComponent;
  let fixture: ComponentFixture<AgingFromRecievedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgingFromRecievedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgingFromRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
