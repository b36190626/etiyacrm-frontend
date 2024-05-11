
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerApiService } from '../../services/customerApi.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterModule } from '@angular/router';
import { CustomerNotFoundComponent } from '../customer-not-found/customer-not-found.component';
import { GetListResponseDto } from '../../models/get-list-response-dto';
import { CustomerResponseDto } from '../../models/customer/customer-response-dto';



@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    CustomerNotFoundComponent
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent implements OnInit{
  customerFound: boolean = true;
  customers: GetListResponseDto<CustomerResponseDto>;
  @Output() selectedCustomer = new EventEmitter<string>();

  p: number = 0;
  constructor(
    private customersApiService: CustomerApiService,
    private change: ChangeDetectorRef,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
      this.customersApiService.getList().subscribe(response => {
      this.customers = response;
      this.change.markForCheck();
      console.log(this.customers);
    });
  }

  getCustomerInfo(customerId: string){
    this.selectedCustomer.emit(customerId);
    this.route.navigate(["/home/customer", customerId, "info" ])
  }

    // Customer araması sonucuna göre customerFound değişkenini güncelleyen bir metot
    searchCustomer() {
      // Customer araması yapılır, customer bulunursa:
      this.customerFound = true;

      // Customer bulunamazsa:
      // this.customerFound = false;
    }

}
