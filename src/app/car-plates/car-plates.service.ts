import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs'; // it's like event emitter but for broader usage

import { CarPlate } from './car-plates.model';

@Injectable({ providedIn: 'root' })
export class CarPlateService {
  private carPlates: CarPlate[] = [];
  // passing CarPlate as a payload
  private carPlatesUpdated = new Subject<CarPlate[]>();

  constructor(private http: HttpClient) {}

  // getting carPlate data from back-end
  getCarPlates() {
    this.http
      .get<{ message: string; carPlates: CarPlate[] }>(
        'http://localhost:3000/api/plates'
      )
      // no need to unsubscribe, Angular handles this
      .subscribe(carPlateData => {
        this.carPlates = carPlateData.carPlates;
        this.carPlatesUpdated.next([...this.carPlates]);
      });
  }

  getCarPlateUpdate() {
    return this.carPlatesUpdated.asObservable();
  }

  addCarPlate(name: string, surname: string, plateData: string) {
    const carPlatez: CarPlate = {
      id: null,
      name,
      surname,
      plateData
    };
    this.carPlates.push(carPlatez);
    // Using Subject to emit data
    this.carPlatesUpdated.next([...this.carPlates]);
  }
}
