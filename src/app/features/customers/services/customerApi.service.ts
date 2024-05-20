import { CreateCustomerRequest } from './../models/customer/requests/create-customer-request';


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListResponseDto } from '../models/get-list-response-dto';
import { CustomerResponseDto } from '../models/customer/customer-response-dto';
import { CustomerDetailsDto } from '../models/customer/customer-details-dto';
import { CustomerUpdateRequest } from '../models/customer/requests/customer-update-request';
import { CustomerUpdateResponse } from '../models/customer/responses/customer-update-response';
import { CreatedCustomerResponse } from '../models/customer/responses/created-customer-response';
import { DeletedCustomerResponse } from '../models/customer/responses/deleted-customer-response';


@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private http: HttpClient) { }

  getList(): Observable<GetListResponseDto<CustomerResponseDto>> {
    return this.http.get<GetListResponseDto<CustomerResponseDto>>('http://localhost:8001/customerservice/api/v1/individualcustomers?page=0&size=10');
  }

  getById(id: string): Observable<CustomerDetailsDto> {
    return this.http.get<CustomerDetailsDto>(`http://localhost:8001/customerservice/api/v1/individualcustomers/${id}`)
  }

  postCustomer(customer: CreateCustomerRequest): Observable<CreatedCustomerResponse>{
    return this.http.post<CreatedCustomerResponse>('http://localhost:8001/customerservice/api/v1/individualcustomers', customer);
  }

  putCustomer(id: string, customer: CustomerUpdateRequest): Observable<CustomerUpdateResponse>{
    return this.http.put<CustomerUpdateResponse>
    (`http://localhost:8001/customerservice/api/v1/individualcustomers/${id}`,customer)
  }

  deleteCustomer(id: string): Observable<DeletedCustomerResponse> {
    return this.http.delete<DeletedCustomerResponse>
    (`http://localhost:8001/customerservice/api/v1/individualcustomers/${id}`)
  }

  checkNationalityIdentityDuplicated(nationalityIdentity: string): Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:8001/customerservice/api/v1/individualcustomers/check-nationality-identity-duplicated/${nationalityIdentity}`)
  }

  checkCustomerReal(checkCustomer: string): Observable<boolean> {
    return this.http.get<boolean>(checkCustomer);
  }

}
