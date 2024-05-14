import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailsDto } from '../models/customer/customer-details-dto';
import { SearchFilterRequest } from '../models/customer/requests/search-filter-request';
import { SearchFilterResponse } from '../models/search-filter/responses/search-filter-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getBySearchFilter(searchFilter: string): Observable<SearchFilterResponse> {
    return this.http.get<SearchFilterResponse>(searchFilter)
  }

}
