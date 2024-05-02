import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WarningPopupComponent } from '../../../../../shared/components/warning-popup/warning-popup.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [
    CommonModule,FormsModule, WarningPopupComponent
  ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent {
  id: number = 0;
  customerId:number = 0;
  accoundNumber:string = '';
  gsmNumber:string = '';
  firstname:string = '';
  lastname:string = '';
  orderNumber:string = '';

  constructor(){}

  searchCustomer(){

  }
}
