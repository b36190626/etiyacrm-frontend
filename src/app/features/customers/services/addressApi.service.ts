import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListResponseDto } from '../models/get-list-response-dto';
import { AddressResponseDto } from '../models/address/address-response-dto';

@Injectable({
  providedIn: 'root'
})
export class AddressApiService {

  constructor(private http: HttpClient) { }

  getList(): Observable<GetListResponseDto<AddressResponseDto>> {
    return this.http.get<GetListResponseDto<AddressResponseDto>>
    ('http://localhost:8081/customerservice/api/v1/addresses');
  }

}
