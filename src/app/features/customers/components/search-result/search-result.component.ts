import { SearchApiService } from '../../services/searchApi.service';

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterModule } from '@angular/router';
import { CustomerNotFoundComponent } from '../customer-not-found/customer-not-found.component';
import { SearchFilterResponse } from '../../models/search-filter/responses/search-filter-response';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    CustomerNotFoundComponent,
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent implements OnInit {
  @Input() customerList: SearchFilterResponse[] = [];
  @Output() selectedCustomer = new EventEmitter<string>();

  p: number = 1;
  itemsPerPage: number = 10;
  totalItems: number;

  constructor(
    private searchApiService: SearchApiService,
    private change: ChangeDetectorRef,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
      this.searchApiService.getAllCustomer().subscribe((response) => {
        this.customerList = response;
        this.change.markForCheck();
        console.log("tüm customerlar",this.customerList);
      });
  }

  getCustomerInfo(customerId: string) {
    this.selectedCustomer.emit(customerId);
    this.route.navigate(['/home/customer', customerId, 'info']);

  }

  goToFirstPage(): void {
    if (this.p !== 1) {
      this.p = 1;
    }
  }

  goToLastPage(): void {
    this.p = this.totalPages;
  }

  get totalPages(): number {
    this.totalItems = this.customerList.length;
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

}
