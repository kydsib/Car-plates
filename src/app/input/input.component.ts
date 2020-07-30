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
  plate: CarPlate;
  private mode = 'create';
  private carPlateId: string;

  constructor(
    public platesService: CarPlateService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.plate);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('carPlateId')) {
        this.mode = 'edit';
        this.carPlateId = paramMap.get('carPlateId');
        console.log(this.carPlateId);
        this.plate = this.platesService.getPlate(this.carPlateId);
      } else {
        this.mode = 'create';
        this.carPlateId = null;
      }
    });
  }

  // onAddCarPlate(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }

  //   this.platesService.addCarPlate(
  //     form.value.fname,
  //     form.value.surname,
  //     form.value.plate
  //   );

  //   form.resetForm();
  // }

  onSaveCarPlate(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.platesService.addCarPlate(
      form.value.fname,
      form.value.surname,
      form.value.plate
    );

    if (this.mode === 'create') {
      this.platesService.addCarPlate(
        form.value.fname,
        form.value.surname,
        form.value.plate
      );
    } else {
      this.platesService.updateCarPlate(
        this.carPlateId,
        form.value.fname,
        form.value.surname,
        form.value.plate
      );
    }

    form.resetForm();
  }
}
