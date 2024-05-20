import { CreatedContactMediumResponse } from './../models/contact-medium/responses/created-contact-medium-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetContactMediumRequestDto } from '../models/contact-medium/requests/get-contact-medium-request';
import { UpdateContactMediumRequest } from '../models/contact-medium/requests/update-contact-medium-request';
import { UpdatedContactMediumResponse } from '../models/contact-medium/responses/updated-contact-medium-response';
import { CreateContactMediumRequest } from '../models/contact-medium/requests/create-contact-medium-request';
import { GetListResponseDto } from '../models/get-list-response-dto';
import { ContactMediumResponseDto } from '../models/contact-medium/contact-medium-response-dto';


@Injectable({
  providedIn: 'root'
})
export class ContactMediumApiService {

  private customerIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  customerId$: Observable<string> = this.customerIdSubject.asObservable();

  constructor(private http: HttpClient) { }

  setCustomerId(customerId: string): void {
    this.customerIdSubject.next(customerId);
  }

  getCustomerId(): Observable<string> {
    return this.customerId$;
  }

  getList(): Observable<GetListResponseDto<ContactMediumResponseDto>> {
    return this.http.get<GetListResponseDto<ContactMediumResponseDto>>
    ('http://localhost:8001/customerservice/api/v1/individualcustomers?page=0&size=10');
  }
  getById(customerId: string): Observable<GetContactMediumRequestDto>{
    return this.http.get<GetContactMediumRequestDto>(`http://localhost:8001/customerservice/api/v1/contact-mediums/${customerId}`)
  }
  postContactMedium(contactMedium: CreateContactMediumRequest): Observable<CreatedContactMediumResponse> {
    return this.http.post<CreatedContactMediumResponse>('http://localhost:8001/customerservice/api/v1/contact-mediums' ,contactMedium)
  }
  putContactMedium(id: string, contactMedium: UpdateContactMediumRequest): Observable<UpdatedContactMediumResponse>{
    return this.http.put<UpdatedContactMediumResponse>
    (`http://localhost:8001/customerservice/api/v1/contact-mediums/${id}`, contactMedium)
  }

}
