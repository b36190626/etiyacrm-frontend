import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailsDto } from '../models/customer/customer-details-dto';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getByNationalityIdentity(nationalityId: string): Observable<CustomerDetailsDto> {
    return this.http.get<CustomerDetailsDto>(`http://localhost:8082/api/v1/search-service/${nationalityId}`)
  }

}
