import { Component } from '@angular/core';

// import { CarPlate } from './car-plates/car-plates.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'car-numbers';
  // storedCarPlates: CarPlate[] = [];

  // recieving data from app-input component
  // onCarPlateAdded(carplateData: {
  //   name: string;
  //   surname: string;
  //   plateData: string;
  // }) {
  //   this.storedCarPlates.push({
  //     name: carplateData.name,
  //     surname: carplateData.surname,
  //     plateData: carplateData.plateData
  //   });
  // }
}
