import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListResponseDto } from '../models/get-list-response-dto';
import { BillingAccountResponse } from '../models/billing-account/responses/billing-account-response-dto';
import { UpdateBillingAccountRequest } from '../models/billing-account/requests/update-billing-account-request';
import { CreateBillingAccountComponent } from '../../customer-details/components/create-billing-account/create-billing-account.component';
import { CreatedBillingAccountResponse } from '../models/billing-account/responses/created-billing-account-response';
import { CreateBillingAccountRequest } from '../models/billing-account/requests/create-billing-account-request';

@Injectable({
  providedIn: 'root'
})
export class BillingAccountApiService {

  constructor(private http: HttpClient) { }

  getList(): Observable<GetListResponseDto<BillingAccountResponse>> {
    return this.http.get<GetListResponseDto<BillingAccountResponse>>
    ('http://localhost:8001/customerservice/api/v1/billing-accounts');
  }

  getById(customerId: string): Observable<BillingAccountResponse[]> {
    return this.http.get<BillingAccountResponse[]>
    (`http://localhost:8001/customerservice/api/v1/billing-accounts/${customerId}`);
  }

  putBillingAccount(id: string, billingAccount: UpdateBillingAccountRequest): Observable<BillingAccountResponse> {
    return this.http.put<BillingAccountResponse>
    (`http://localhost:8001/customerservice/api/v1/billing-accounts/${id}`, billingAccount);
  }

  postBillingAccount(billingAccount: CreateBillingAccountComponent): Observable<CreatedBillingAccountResponse> {
    return this.http.post<CreateBillingAccountRequest>
    ('http://localhost:8001/customerservice/api/v1/billing-accounts', billingAccount);
  }


}
