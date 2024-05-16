import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessMessageService {

  private successMessageSubject = new Subject<string>();
  successMessage$ = this.successMessageSubject.asObservable();

  constructor() {}

  setSuccessMessage(message: string) {
    this.successMessageSubject.next(message);
  }

}
