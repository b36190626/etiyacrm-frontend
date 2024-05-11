

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListResponseDto } from '../models/get-list-response-dto';
import { CustomerResponseDto } from '../models/customer/customer-response-dto';
import { CustomerDetailsDto } from '../models/customer/customer-details-dto';
import { CustomerUpdateRequest } from '../models/customer/requests/customer-update-request';
import { CustomerUpdateResponse } from '../models/customer/responses/customer-update-response';


@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private http: HttpClient) { }

  getList(): Observable<GetListResponseDto<CustomerResponseDto>> {
    return this.http.get<GetListResponseDto<CustomerResponseDto>>('http://localhost:8081/customerservice/api/v1/individualcustomers?page=0&size=10');

  }

  getById(id: string): Observable<CustomerDetailsDto> {
    return this.http.get<CustomerDetailsDto>(`http://localhost:8081/customerservice/api/v1/individualcustomers/${id}`)
  }

  putCustomer(id: string, customer: CustomerUpdateRequest): Observable<CustomerUpdateResponse>{
    return this.http.put<CustomerUpdateResponse>
    (`http://localhost:8081/customerservice/api/v1/individualcustomers/${id}`,customer)
  }

}
