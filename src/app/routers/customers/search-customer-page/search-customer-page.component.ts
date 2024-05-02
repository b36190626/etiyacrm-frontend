import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchFilterComponent } from '../../../features/customers/components/search-filter/search-filter.component';
import { SearchResultComponent } from '../../../features/customers/components/search-result/search-result.component';

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
export class SearchCustomerPageComponent{
constructor() {}
}
