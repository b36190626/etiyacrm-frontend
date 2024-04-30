import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchFilterComponent } from '../../../features/search-customer/search-filter/components/search-filter/search-filter.component';
import { SearchResultComponent } from '../../../features/search-customer/search-result/components/search-result/search-result.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-customer-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchFilterComponent,
    SearchResultComponent
  ],
  templateUrl: './search-customer-page.component.html',
  styleUrl: './search-customer-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCustomerPageComponent { }
