import { PutDefaultAddressResponse } from './../models/address/responses/put-default-address-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListResponseDto } from '../models/get-list-response-dto';
import { AddressResponseDto } from '../models/address/address-response-dto';
import { UpdateAddressRequest } from '../models/address/requests/update-address-request';
import { UpdatedAddressResponse } from '../models/address/responses/updated-address-response';
import { CreateAddressRequest } from '../models/address/requests/create-address-request';
import { CreatedAddressResponse } from '../models/address/responses/created-address-response';
import { CitiesResponseDto } from '../models/cities/cities-response-dto';
import { DistrictsResponseDto } from '../models/districts/districts-response-dto';
import { DeletedAddressResponse } from '../models/address/responses/deleted-address-response';
import { PutDefaultAddressRequest } from '../models/address/requests/put-default-address-request';




@Injectable({
  providedIn: 'root'
})
export class AddressApiService {

  constructor(private http: HttpClient) { }

  getList(): Observable<GetListResponseDto<AddressResponseDto>> {
    return this.http.get<GetListResponseDto<AddressResponseDto>>
    ('http://localhost:8081/customerservice/api/v1/addresses');
  }
  getById(customerId: string): Observable<AddressResponseDto[]>{
    return this.http.get<AddressResponseDto[]>(`http://localhost:8001/customerservice/api/v1/addresses/${customerId}`)
  }
  deleteAddress(id: string): Observable<DeletedAddressResponse> {
    return this.http.delete<DeletedAddressResponse>
    (`http://localhost:8001/customerservice/api/v1/addresses/${id}`)
  }
  putAddress(id: string, address: UpdateAddressRequest): Observable<UpdatedAddressResponse>{
    return this.http.put<UpdatedAddressResponse>
    (`http://localhost:8001/customerservice/api/v1/addresses/${id}`, address)
  }
  putDefaultAddress(id: string, address: PutDefaultAddressRequest): Observable<PutDefaultAddressResponse>{
    return this.http.put<PutDefaultAddressResponse>
    (`http://localhost:8001/customerservice/api/v1/addresses/setDefaultAddress/${id}`, address)
  }
  postAddress(address: CreateAddressRequest): Observable<CreatedAddressResponse>{
    return this.http.post<CreatedAddressResponse>('http://localhost:8001/customerservice/api/v1/addresses', address);
  }

  getCities(): Observable<CitiesResponseDto> { //getCitiesRequest,response...
    return this.http.get<CitiesResponseDto>('http://localhost:8001/customerservice/api/v1/cities');
  }

  getDistricts(): Observable<DistrictsResponseDto> {
    return this.http.get<DistrictsResponseDto>(`http://localhost:8001/customerservice/api/v1/districts`);
  }
  getCityById(cityId): Observable<CitiesResponseDto> { //getCitiesRequest,response...
    return this.http.get<CitiesResponseDto>(`http://localhost:8001/customerservice/api/v1/cities/${cityId}`);
  }
  getDistrictById(districtId: string): Observable<DistrictsResponseDto> {
    return this.http.get<DistrictsResponseDto>(`http://localhost:8001/customerservice/api/v1/districts/${districtId}`);
  }

}

