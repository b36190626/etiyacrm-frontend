import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetListResponseDto } from '../models/get-list-response-dto';
import { ContactMediumResponseDto } from '../models/contact-medium/contact-medium-response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactMediumApiService {

  constructor(private http: HttpClient) { }

  getList(): Observable<GetListResponseDto<ContactMediumResponseDto>> {
    return this.http.get<GetListResponseDto<ContactMediumResponseDto>>
    ('http://localhost:8081/customerservice/api/v1/individualcustomers?page=0&size=10');
  }

}
