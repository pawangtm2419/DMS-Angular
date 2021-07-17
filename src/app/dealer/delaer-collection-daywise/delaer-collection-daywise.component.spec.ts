import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelaerCollectionDaywiseComponent } from './delaer-collection-daywise.component';

describe('DelaerCollectionDaywiseComponent', () => {
  let component: DelaerCollectionDaywiseComponent;
  let fixture: ComponentFixture<DelaerCollectionDaywiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelaerCollectionDaywiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelaerCollectionDaywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
