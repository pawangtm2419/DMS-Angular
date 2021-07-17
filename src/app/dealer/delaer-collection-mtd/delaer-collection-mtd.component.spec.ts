import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelaerCollectionMTDComponent } from './delaer-collection-mtd.component';

describe('DelaerCollectionMTDComponent', () => {
  let component: DelaerCollectionMTDComponent;
  let fixture: ComponentFixture<DelaerCollectionMTDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelaerCollectionMTDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelaerCollectionMTDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
