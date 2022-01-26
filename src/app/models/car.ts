export interface Car {
  id: number;
  make: string;
  year: number;
  type: string;
  model: string;
}
export class Car {
  constructor(
    public make: string = "",
    public year: number = 0,
    public type: string = "",
    public model: string = ""
  ) { }
}
