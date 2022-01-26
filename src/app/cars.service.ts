import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Car } from './models/car';
import { DataResponse } from './models/data-response';
import { Make } from './models/make';
import { Type } from './models/type';
import { Year } from './models/year';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private api = environment.api;
  private years = [];
  private makes = [];
  private types = [];

  constructor(private http: HttpClient) { }

  getTypes(): Observable<Type[]> {
    if (this.types.length) {
      return of(this.types);
    }
    return this.http.get<DataResponse<Type[]>>(`${this.api}/types`).pipe(
      map(res => res.data || []),
      tap(data => this.types = data)
    );
  }
  getMakes(): Observable<Make[]> {
    if (this.makes.length) {
      return of(this.makes);
    }
    return this.http.get<DataResponse<Make[]>>(`${this.api}/makes`).pipe(
      map(res => res.data || []),
      tap(data => this.makes = data)
    );
  }
  getYears(): Observable<Year[]> {
    if (this.years.length) {
      return of(this.years);
    }
    return this.http.get<DataResponse<Year[]>>(`${this.api}/years`).pipe(
      map(res => res.data || []),
      tap(data => this.years = data)
    );
  }
  getCars(filters: Car): Observable<Car[]> {
    console.log(filters);
    const params = {
      model: filters.model,
      year: filters.year + "",
      type: filters.type,
      make: filters.make
    };
    return this.http.get<DataResponse<Car[]>>(`${this.api}/cars`, { params }).pipe(
      map(res => res.data || [])
    );
  }
}
