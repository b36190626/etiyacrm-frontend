import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerListItemDto } from '../models/customer-list-item-dto';
import { Observable } from 'rxjs';
import { CustomerDetailsDto } from '../models/customer-details-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private http: HttpClient) { }

  getList(): Observable<CustomerListItemDto[]> {
    return this.http.get<CustomerListItemDto[]>
      ('http://localhost:3000/customers')
  }

  getById(id: number): Observable<CustomerDetailsDto> {
    return this.http.get<CustomerDetailsDto>(`http://localhost:3000/customers/${id}`)
  }
}
