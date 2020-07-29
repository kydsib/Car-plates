import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CarPlate } from '../car-plates.model';
import { CarPlateService } from '../car-plates.service';

@Component({
  selector: 'app-car-plates-list',
  templateUrl: './car-plates-list.component.html',
  styleUrls: ['./car-plates-list.component.scss']
})
export class CarPlatesListComponent implements OnInit, OnDestroy {
  carPlates: CarPlate[] = [];
  // using this to remove subsciption when element is removed from DOM
  private carPlatesSubscription: Subscription;

  constructor(public platesService: CarPlateService) {}

  ngOnInit() {
    this.platesService.getCarPlates();
    this.carPlatesSubscription = this.platesService
      .getCarPlateUpdate()
      .subscribe((carPlates: CarPlate[]) => {
        this.carPlates = carPlates;
      });
  }

  ngOnDestroy() {
    this.carPlatesSubscription.unsubscribe();
  }
}
