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
import { SuccessMessageService } from '../../services/successMessage.service';
import { SuccessPopupComponent } from '../../../../shared/components/success-popup/success-popup.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    CustomerNotFoundComponent,
    SuccessPopupComponent
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
  successMessage: string | null = null;

  constructor(
    private searchApiService: SearchApiService,
    private change: ChangeDetectorRef,
    private route: Router,
    private successMessageService: SuccessMessageService
  ) {}

  ngOnInit(): void {
    if(!this.customerList.length){
      this.getList();
    }
    this.successMessageService.successMessage$.subscribe(message => {
      this.successMessage = message;
    });
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
