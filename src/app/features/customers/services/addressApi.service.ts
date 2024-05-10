import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListResponseDto } from '../models/get-list-response-dto';
import { AddressResponseDto } from '../models/address/address-response-dto';
import { GetAddressRequest } from '../models/address/requests/get-address-request';
import { UpdateAddressRequest } from '../models/address/requests/update-address-request';
import { UpdatedAddressResponse } from '../models/address/responses/updated-address-response';




@Injectable({
  providedIn: 'root'
})
export class AddressApiService {

  constructor(private http: HttpClient) { }

  getList(): Observable<GetListResponseDto<AddressResponseDto>> {
    return this.http.get<GetListResponseDto<AddressResponseDto>>
    ('http://localhost:8081/customerservice/api/v1/addresses');
  }
  getById(customerId: String): Observable<GetAddressRequest>{
    return this.http.get<GetAddressRequest>(`http://localhost:8081/customerservice/api/v1/addresses/${customerId}`)
  }

  putAddress(id: String, address: UpdateAddressRequest): Observable<UpdatedAddressResponse>{
    return this.http.put<UpdatedAddressResponse>
    (`http://localhost:8081/customerservice/api/v1/addresses/${id}`, address)
  }

  getCities(): Observable<any> {
    return this.http.get('http://localhost:8081/customerservice/api/v1/cities');
  }

  getDistricts(): Observable<any> {
    return this.http.get(`http://localhost:8081/customerservice/api/v1/districts`);
  }

}
