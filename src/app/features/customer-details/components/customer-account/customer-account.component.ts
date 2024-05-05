import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerListItemDto } from '../../../customers/models/customer-list-item-dto';
import { CustomerApiService } from '../../../customers/services/customerApi.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

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
  list: Array<CustomerListItemDto> = [];
  p: number = 1;
  selectedRow: number = -1;

  constructor(
    private customersApiService: CustomerApiService,
    private change: ChangeDetectorRef
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



  toggleAccordion(index: number) {
    this.selectedRow = (this.selectedRow === index) ? -1 : index;
    console.log("olmadı")
  }
}
