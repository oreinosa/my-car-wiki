import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { CarsService } from './cars.service';
import { Car } from './models/car';
import { Make } from './models/make';
import { Type } from './models/type';
import { Year } from './models/year';
import { RequireMatch as RequireMatch } from './require-match.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  result$: Observable<Car[]>;

  carForm = new FormGroup({
    model: new FormControl(""),
    year: new FormControl(new Year(0), RequireMatch),
    make: new FormControl(new Make(""), RequireMatch),
    type: new FormControl(new Type(""), RequireMatch)
  });

  yearsOptions: Year[] = null;
  yearsFilteredOptions: Observable<Year[]>;

  makesOptions: Make[] = null;
  makesFilteredOptions: Observable<Make[]>;

  typesOptions: Type[] = null;
  typesFilteredOptions: Observable<Type[]>;

  constructor(
    private carsService: CarsService
  ) { }

  async ngOnInit() {

    [this.yearsOptions, this.typesOptions, this.makesOptions] = await Promise.all([
      this.carsService.getYears().toPromise(),
      this.carsService.getTypes().toPromise(),
      this.carsService.getMakes().toPromise()
    ]);

    this.yearsFilteredOptions = this.carForm.get("year").valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value, this.yearsOptions)),
    );

    this.typesFilteredOptions = this.carForm.get("type").valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value, this.typesOptions)),
    );

    this.makesFilteredOptions = this.carForm.get("make").valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value, this.makesOptions)),
    );
  }

  private _filter(value: any, allValues: any[]): any[] {
    const filterValue = (typeof value === 'string' ? value : (value.name + "")).toLowerCase();
    return allValues.filter(option => (option.name + "").toLowerCase().includes(filterValue));
  }

  displayWith(obj?: any): string | undefined {
    return obj ? obj.name : undefined;
  }

  onSubmit() {
    const { model, year, type, make } = this.carForm.value;
    console.log(model, year, type, make);
    this.result$ = this.carsService.getCars(new Car(make.name, year.name, type.name, model));
  }
}
