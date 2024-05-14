import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchFilterComponent } from '../../../features/customers/components/search-filter/search-filter.component';
import { SearchResultComponent } from '../../../features/customers/components/search-result/search-result.component';
import { SearchFilterResponse } from '../../../features/customers/models/search-filter/responses/search-filter-response';
import { CustomerNotFoundComponent } from '../../../features/customers/components/customer-not-found/customer-not-found.component';

@Component({
  selector: 'app-search-customer-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchFilterComponent,
    SearchResultComponent,
    CustomerNotFoundComponent

  ],
  templateUrl: './search-customer-page.component.html',
  styleUrl: './search-customer-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCustomerPageComponent {
  customerList: SearchFilterResponse[] = [];
  customerFound: boolean = true;

constructor() {}

receiveSearchResults(customers: SearchFilterResponse[]) {
  this.customerList = customers;
  this.updateCustomerFound();
}

updateCustomerFound() {
  this.customerFound = this.customerList.length > 0;
}

}
