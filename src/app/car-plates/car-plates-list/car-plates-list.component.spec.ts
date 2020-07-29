import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPlatesListComponent } from './car-plates-list.component';

describe('CarPlatesListComponent', () => {
  let component: CarPlatesListComponent;
  let fixture: ComponentFixture<CarPlatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPlatesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPlatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
