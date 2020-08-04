import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'; // it's like event emitter but for broader usage

import { CarPlate } from './car-plates.model';

@Injectable({ providedIn: 'root' })
export class CarPlateService {
  private carPlates: CarPlate[] = [];
  // passing CarPlate as a payload
  private carPlatesUpdated = new Subject<{
    carPlates: CarPlate[];
    plateCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  // getting carPlate data from back-end
  getCarPlates(platesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${platesPerPage}&page=${currentPage}`;
    this.http
      .get<{ carPlates: CarPlate[]; totalPlateCount: number }>(
        'http://localhost:3000/api/plates' + queryParams
      )
      // no need to unsubscribe, Angular handles this
      //subscribe is used for request to be actualy sent
      .subscribe(carPlateData => {
        this.carPlates = carPlateData.carPlates;
        console.log(this.carPlates);
        this.carPlatesUpdated.next({
          carPlates: [...this.carPlates],
          // might break here
          plateCount: carPlateData.totalPlateCount
        });
      });
  }

  checkIfPlateTaken() {
    return this.http.get('http://localhost:3000/api/plates');
  }

  getCarPlateUpdate() {
    console.log(this.carPlatesUpdated.asObservable());
    return this.carPlatesUpdated.asObservable();
  }

  getPlate(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      surname: string;
      plateData: string;
    }>('http://localhost:3000/api/plates/' + id);
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
        this.router.navigate(['/']);
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
        this.router.navigate(['/']);
      });
  }

  deletePlate(carPlateId: string) {
    return this.http.delete('http://localhost:3000/api/plates/' + carPlateId);
  }
}
