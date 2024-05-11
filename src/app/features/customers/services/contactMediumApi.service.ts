import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetListResponseDto } from '../models/get-list-response-dto';
import { ContactMediumResponseDto } from '../models/contact-medium/contact-medium-response-dto';
import { Observable } from 'rxjs';
import { GetContactMediumRequestDto } from '../models/contact-medium/requests/get-contact-medium-request';
import { UpdateContactMediumRequest } from '../models/contact-medium/requests/update-contact-medium-request';
import { UpdatedContactMediumResponse } from '../models/contact-medium/responses/updated-contact-medium-response';



@Injectable({
  providedIn: 'root'
})
export class ContactMediumApiService {

  constructor(private http: HttpClient) { }

  getList(): Observable<GetListResponseDto<ContactMediumResponseDto>> {
    return this.http.get<GetListResponseDto<ContactMediumResponseDto>>
    ('http://localhost:8081/customerservice/api/v1/individualcustomers?page=0&size=10');
  }
  getById(customerId: string): Observable<GetContactMediumRequestDto>{
    return this.http.get<GetContactMediumRequestDto>(`http://localhost:8081/customerservice/api/v1/contact-mediums/${customerId}`)
  }

  putContactMedium(id: string, contactMedium: UpdateContactMediumRequest): Observable<UpdatedContactMediumResponse>{
    return this.http.put<UpdatedContactMediumResponse>
    (`http://localhost:8081/customerservice/api/v1/contact-mediums/${id}`, contactMedium)
  }

}
