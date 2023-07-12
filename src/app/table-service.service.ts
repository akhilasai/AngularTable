import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {
  private selectedDataFromDialog = new BehaviorSubject<any>({});

  selectedData(): Observable<any> {
    return this.selectedDataFromDialog.asObservable();
  }
  sendDataToTable(data: any) {
    this.selectedDataFromDialog.next(data);
  }
  constructor() { }
}
