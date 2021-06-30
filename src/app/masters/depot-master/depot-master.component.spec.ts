import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotMasterComponent } from './depot-master.component';

describe('DepotMasterComponent', () => {
  let component: DepotMasterComponent;
  let fixture: ComponentFixture<DepotMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
