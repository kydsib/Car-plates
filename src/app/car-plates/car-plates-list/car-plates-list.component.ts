import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { CarPlate } from '../car-plates.model';
import { CarPlateService } from '../car-plates.service';

@Component({
  selector: 'app-car-plates-list',
  templateUrl: './car-plates-list.component.html',
  styleUrls: ['./car-plates-list.component.scss']
})
export class CarPlatesListComponent implements OnInit, OnDestroy {
  isLoading = false;
  totalPlates = 0;
  platesPerPage = 1;
  currentPage = 1;
  platesPerPageOptions = [3, 5, 15, 25];
  carPlates: CarPlate[] = [];
  // using this to remove subsciption when element is removed from DOM
  private carPlatesSubscription: Subscription;

  constructor(public platesService: CarPlateService) {}

  ngOnInit() {
    this.isLoading = true;
    this.platesService.getCarPlates(this.platesPerPage, this.currentPage);
    this.carPlatesSubscription = this.platesService
      .getCarPlateUpdate()
      .subscribe((plateData: { carPlates: CarPlate[]; plateCount: number }) => {
        this.isLoading = false;
        this.carPlates = plateData.carPlates;
        this.totalPlates = plateData.plateCount;
      });
  }

  onChangedCount(count: PageEvent) {
    this.isLoading = true;
    this.currentPage = count.pageIndex + 1;
    this.platesPerPage = count.pageSize;
    this.platesService.getCarPlates(this.platesPerPage, this.currentPage);
  }

  // can I have this method here and transfer it to car plate?
  onDelete(carPlateId: string) {
    this.platesService.deletePlate(carPlateId).subscribe(() => {
      this.platesService.getCarPlates(this.platesPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.carPlatesSubscription.unsubscribe();
  }
}
