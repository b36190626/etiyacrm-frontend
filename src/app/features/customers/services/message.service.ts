import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  constructor() {}

  setmessage(message: string) {
    this.messageSubject.next(message);
  }

  clearmessage() {
    this.messageSubject.next(null);
  }

}
