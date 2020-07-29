import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPlateItemComponent } from './car-plate-item.component';

describe('CarPlateItemComponent', () => {
  let component: CarPlateItemComponent;
  let fixture: ComponentFixture<CarPlateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPlateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPlateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
