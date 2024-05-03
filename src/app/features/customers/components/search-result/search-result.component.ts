
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerListItemDto } from '../../models/customer-list-item-dto';
import { CustomerApiService } from '../../services/customerApi.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    CommonModule, NgxPaginationModule, RouterModule
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent implements OnInit{
  list: Array<CustomerListItemDto> = [];
  @Output() selectedCustomer = new EventEmitter<number>();

  p: number = 1;
  constructor(
    private customersApiService: CustomerApiService,
    private change: ChangeDetectorRef,
    private route: Router,
  ) {}
  ngOnInit(): void {
    this.getList();
  }

  getList() {
      this.customersApiService.getList().subscribe(customers => {
      this.list = customers;
      this.change.markForCheck();
    });
  }

  getCustomerInfo(customerId: number){
    this.selectedCustomer.emit(customerId);
    this.route.navigate(["/home/customer/customer-info/", customerId ])
  }

}
