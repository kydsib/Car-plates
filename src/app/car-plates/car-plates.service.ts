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
      //subscribe is used for request to be actualy sent
      .subscribe(carPlateData => {
        this.carPlates = carPlateData.carPlates;
        this.carPlatesUpdated.next([...this.carPlates]);
      });
  }

  getCarPlateUpdate() {
    return this.carPlatesUpdated.asObservable();
  }

  getPlate(id: string) {
    return { ...this.carPlates.find(plate => plate._id === id) };
  }

  addCarPlate(name: string, surname: string, plateData: string) {
    const carPlate: CarPlate = {
      _id: null,
      name,
      surname,
      plateData
    };
    this.http
      .post<{ carPlateId: string }>(
        'http://localhost:3000/api/plates',
        carPlate
      )
      .subscribe(responseData => {
        console.log(carPlate);
        const id = responseData.carPlateId;
        carPlate._id = id;
        this.carPlates.push(carPlate);
        // Using Subject to emit data
        this.carPlatesUpdated.next([...this.carPlates]);
      });
  }

  updateCarPlate(
    _id: string,
    name: string,
    surname: string,
    plateData: string
  ) {
    const plate: CarPlate = { _id, name, surname, plateData };
    this.http
      .put('http://localhost:3000/api/plates/' + _id, plate)
      .subscribe(response => {
        const updatedPlaes = [...this.carPlates];
        const oldPlateIndex = updatedPlaes.findIndex(e => e._id === plate._id);
        updatedPlaes[oldPlateIndex] = plate;
        this.carPlates = updatedPlaes;
        this.carPlatesUpdated.next([...this.carPlates]);
      });
  }

  deletePlate(carPlateId: string) {
    this.http
      .delete('http://localhost:3000/api/plates/' + carPlateId)
      .subscribe(() => {
        // updating car plates by removing deleted by id
        const updatedCarPlates = this.carPlates.filter(
          plate => plate._id !== carPlateId
        );

        this.carPlates = updatedCarPlates;
        this.carPlatesUpdated.next([...this.carPlates]);
      });
  }
}
