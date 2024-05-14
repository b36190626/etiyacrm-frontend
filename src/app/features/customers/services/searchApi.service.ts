import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchFilterResponse } from '../models/search-filter/responses/search-filter-response';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {

  constructor(private http: HttpClient) { }

  getBySearchFilter(searchFilter: string): Observable<SearchFilterResponse> {
    return this.http.get<SearchFilterResponse>(searchFilter);
  }

  getAllCustomer(): Observable<SearchFilterResponse[]> {
    return this.http.get<SearchFilterResponse[]>("http://localhost:8082/api/v1/search-service/getAll");
  }
}
