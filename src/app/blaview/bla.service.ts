import { Injectable } from "@angular/core";
import { of } from "rxjs";

export interface Player {
  id: number;
  name: string;
  extraSearchFields: string;
  rating: number;
  comments: string;
}

@Injectable({ providedIn: 'root' })
export class BlaService {

  makeDummyData(): Player[] {
    let result = [] as Player[];
    result.push({ id: 1,  name: 'John Doe',   extraSearchFields: 'fuzz Doe',    rating: 1000, comments: 'John Doe' });
    result.push({ id: 2,  name: 'Jane Doe',   extraSearchFields: 'bar',    rating: 1000, comments: 'Dane Doe' });
    result.push({ id: 3,  name: 'John Smith', extraSearchFields: 'pop Smith',  rating: 1000, comments: 'John Smith' });
    result.push({ id: 4,  name: 'Jane Smith', extraSearchFields: 'Jane',  rating: 1000, comments: 'Jane Smith' });
    result.push({ id: 5,  name: 'John Doe',   extraSearchFields: 'Johnp',    rating: 1000, comments: 'John Doe' });
    result.push({ id: 6,  name: 'Jane Doe',   extraSearchFields: 'Jane fizz',    rating: 1000, comments: 'Aane Doe' });
    result.push({ id: 7,  name: 'John Smith', extraSearchFields: 'John Smith',  rating: 1000, comments: 'John Smith' });
    result.push({ id: 8,  name: 'Jane Smith', extraSearchFields: 'Jane Smith',  rating: 1000, comments: 'Jane Smith' });
    result.push({ id: 9,  name: 'John Doe',   extraSearchFields: 'John Doe',    rating: 1000, comments: 'John Doe' });
    result.push({ id: 10, name: 'Jane Doe',   extraSearchFields: 'Jane Doe',    rating: 1000, comments: 'Zane Doe' });
    result.push({ id: 11, name: 'John Smith', extraSearchFields: 'John Smith',  rating: 1000, comments: 'John Smith' });
    result.push({ id: 12, name: 'Jane Smith', extraSearchFields: 'Jane Smith',  rating: 1000, comments: 'Fane Smith' });
    result.push({ id: 13, name: 'John Doe',   extraSearchFields: 'John Doe',    rating: 1000, comments: 'John Doe' });
    result.push({ id: 14, name: 'Jane Doe',   extraSearchFields: 'Jane Doe',    rating: 1000, comments: 'Jane Doe' });
    result.push({ id: 15, name: 'John Smith', extraSearchFields: 'John Smith',  rating: 1000, comments: 'John Smith' });
    result.push({ id: 16, name: 'Jane Smith', extraSearchFields: 'Jane Smith',  rating: 1000, comments: 'Jane Smith' });
    result.push({ id: 17, name: 'John Doe',   extraSearchFields: 'John Doe',    rating: 1000, comments: 'John Doe' });
    return result;
  }

  players$ = of(this.makeDummyData());


}