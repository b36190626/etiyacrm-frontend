import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WarningPopupComponent } from '../../../../../shared/components/warning-popup/warning-popup.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/searchService';

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
export class SearchFilterComponent implements OnInit {
  id!: number
  customerId!:number
  accoundNumber!:string
  gsmNumber!:string
  firstname!:string
  lastname!:string
  orderNumber!:string

  constructor(
    private searchService: SearchService
  ){}


  onSubmit(){

  }

  ngOnInit(): void {

  }

}
