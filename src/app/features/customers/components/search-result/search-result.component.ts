import { SearchService } from './../../services/searchService';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerListItemDto } from '../../models/customer-list-item-dto';
import { CustomerApiService } from '../../services/customerApi.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    CommonModule, NgxPaginationModule
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent implements OnInit{
  list: Array<CustomerListItemDto> = [];
  constructor(
    private customersApiService: CustomerApiService,
    private searchSerivce: SearchService,
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

}
