import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NgForm } from '@angular/forms';
import { CarPlateService } from '../car-plates/car-plates.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  // Outputing data in app component
  // @Output() carPlateAdded = new EventEmitter<{
  //   name: string;
  //   surname: string;
  //   plateData: string;
  // }>();

  constructor(public platesService: CarPlateService) {}

  ngOnInit(): void {}

  onAddCarPlate(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.platesService.addCarPlate(
      form.value.fname,
      form.value.surname,
      form.value.plate
    );

    form.resetForm();
  }
}
