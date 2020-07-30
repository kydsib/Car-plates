import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { NgForm } from '@angular/forms';
import { CarPlateService } from '../car-plates/car-plates.service';
import { CarPlate } from '../car-plates/car-plates.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  carPlate: CarPlate;
  private mode = 'create';
  private plateId: string;

  constructor(
    public platesService: CarPlateService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('carPlateId')) {
        this.mode = 'edit';
        this.plateId = paramMap.get('carPlateId');

        this.platesService.getPlate(this.plateId).subscribe(carPlateData => {
          this.carPlate = {
            _id: carPlateData._id,
            name: carPlateData.name,
            surname: carPlateData.surname,
            plateData: carPlateData.plateData
          };
        });
      } else {
        this.mode = 'create';
        this.plateId = null;
      }
    });
  }

  onSaveCarPlate(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.platesService.addCarPlate(
        form.value.fname,
        form.value.surname,
        form.value.plate
      );
    } else {
      this.platesService.updateCarPlate(
        this.plateId,
        form.value.fname,
        form.value.surname,
        form.value.plate
      );
    }

    form.resetForm();
  }
}
