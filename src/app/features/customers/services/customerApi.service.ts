
import { CustomerListItemDto } from './../models/customer-list-item-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CustomerUpdateResponse } from '../models/customer-update-response';

import { CustomerListItemDto } from '../models/customer-list-item-dto';
import { map, Observable } from 'rxjs';

import { CustomerDetailsDto } from '../models/customer-details-dto';
import { CustomerUpdateRequest } from '../models/customer-update-request';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private http: HttpClient) { }

  // getList(): Observable<CustomerListItemDto[]> {
  //   return this.http.get<CustomerListItemDto[]>
  //     ('http://localhost:8081/customerservice/api/v1/individualcustomers')
  // }

  getList(): Observable<CustomerListItemDto[]> {
    return this.http.get<CustomerListItemDto>('http://localhost:8081/customerservice/api/v1/individualcustomers').pipe(
      map((response: any) => response.items.map((item: any) => ({
        id: item.id,
        firstName: item.firstName,
        middleName: item.middleName,
        lastName: item.lastName,
        email: item.email,
        gender: item.gender,
        birthDate: item.birthDate,
        motherName: item.motherName,
        fatherName: item.fatherName,
        nationalityIdentity: item.nationalityIdentity
      })))
    );
  }

  getById(id: number): Observable<CustomerDetailsDto> {
    return this.http.get<CustomerDetailsDto>(`http://localhost:8081/customerservice/api/v1/individualcustomers/${id}`)
  }

  putCustomer(id: number, customer: CustomerUpdateRequest): Observable<CustomerUpdateResponse>{
    return this.http.put<CustomerUpdateResponse>
    (`http://localhost:8081/customerservice/api/v1/individualcustomers/${id}`,customer)

    
  }


}
