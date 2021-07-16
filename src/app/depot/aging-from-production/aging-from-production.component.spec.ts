import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgingFromProductionComponent } from './aging-from-production.component';

describe('AgingFromProductionComponent', () => {
  let component: AgingFromProductionComponent;
  let fixture: ComponentFixture<AgingFromProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgingFromProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgingFromProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
