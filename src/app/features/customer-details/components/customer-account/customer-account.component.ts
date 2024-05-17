import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetListResponseDto } from '../../../customers/models/get-list-response-dto';
import { CustomerResponseDto } from '../../../customers/models/customer/customer-response-dto';
import { GetBillingAccountRequest } from '../../../customers/models/billing-account/requests/get-billing-account-request';
import { BillingAccountApiService } from '../../../customers/services/billingAccountApi.service';

@Component({
  selector: 'app-customer-account',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    NgxPaginationModule
  ],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAccountComponent implements OnInit{

  customerId!: string;
  billingAccountInfo!: GetBillingAccountRequest[];

  list: GetListResponseDto<CustomerResponseDto>;
  p: number = 1;
  selectedRow: number = -1;
click: any;

  constructor(
    //private customersApiService: CustomerApiService,
    private billingAccountApiService: BillingAccountApiService,
    private change: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(params => {
      this.customerId = params['id'];
    })
    this.getBillingAccount();

  }

  getBillingAccount(){
    this.billingAccountApiService.getById(this.customerId).subscribe({
      next: (accountDetails) => {
        this.billingAccountInfo = accountDetails;
        console.log(accountDetails, "geldi");
      },
      complete: () => {
        this.change.markForCheck();
      }
    })
  }
  navigateToCreateAccount(): void {
    this.router.navigate([`/home/customer/${this.customerId}/account/create-account`]);
  }
  // getList() {
  //     this.customersApiService.getList().subscribe(customers => {
  //     this.list = customers;
  //     this.change.markForCheck();
  //   });
  // }

  toggleAccordion(index: number) {
    this.selectedRow = (this.selectedRow === index) ? -1 : index;
    console.log("olmadı")
  }
}
