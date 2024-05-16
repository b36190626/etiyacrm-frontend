import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListResponseDto } from '../models/get-list-response-dto';
import { BillingAccountResponse } from '../models/billing-account/responses/billing-account-response-dto';
import { GetBillingAccountRequest } from '../models/billing-account/requests/get-billing-account-request';
import { UpdateBillingAccountRequest } from '../models/billing-account/requests/update-billing-account-request';
import { UpdatedBillingAccountResponse } from '../models/billing-account/responses/updated-billing-account-response';
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
    ('http://localhost:8081/customerservice/api/v1/billing-accounts');
  }

  getById(customerId: string): Observable<GetBillingAccountRequest[]> {
    return this.http.get<GetBillingAccountRequest[]>
    (`http://localhost:8081/customerservice/api/v1/billing-accounts/${customerId}`);
  }

  putBillingAccount(id: string, billingAccount: UpdateBillingAccountRequest): Observable<UpdatedBillingAccountResponse> {
    return this.http.put<UpdateBillingAccountRequest>
    (`http://localhost:8081/customerservice/api/v1/billing-accounts/${id}`, billingAccount);
  }

  postBillingAccount(billingAccount: CreateBillingAccountComponent): Observable<CreatedBillingAccountResponse> {
    return this.http.post<CreateBillingAccountRequest>
    ('http://localhost:8081/customerservice/api/v1/billing-accounts', billingAccount);
  }


}
