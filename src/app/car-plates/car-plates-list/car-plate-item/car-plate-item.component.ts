import { Component, OnInit, Input } from '@angular/core';

import { CarPlate } from '../../car-plates.model';
import { CarPlateService } from '../../car-plates.service';

@Component({
  selector: 'app-car-plate-item',
  templateUrl: './car-plate-item.component.html',
  styleUrls: ['./car-plate-item.component.scss']
})
export class CarPlateItemComponent implements OnInit {
  showModal = false;
  // exposing carPlate to parent component so CarPlates from app can be binded to this
  // to use other name outside of element @Input(outsideName) insideName

  @Input() carPlate: CarPlate;
  @Input() platesPerPage: number;
  @Input() currentPage: number;

  constructor(public platesService: CarPlateService) {}

  onDelete(carPlateId: string) {
    this.platesService.deletePlate(carPlateId).subscribe(() => {
      // after deleting new values shuold be fetched
      this.platesService.getCarPlates(this.platesPerPage, this.currentPage);
    });
  }

  ngOnInit(): void {}
}
