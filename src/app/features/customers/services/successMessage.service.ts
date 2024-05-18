import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessMessageService {

  private successMessageSubject = new BehaviorSubject<string | null>(null);
  successMessage$ = this.successMessageSubject.asObservable();

  constructor() {}

  setSuccessMessage(message: string) {
    this.successMessageSubject.next(message);
  }

  clearSuccessMessage() {
    this.successMessageSubject.next(null);
  }

}
