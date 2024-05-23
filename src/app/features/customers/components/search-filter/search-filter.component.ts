import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
import { NoStringInputDirective } from '../../../../core/directives/no-string-input.directive';
import { SearchApiService } from '../../services/searchApi.service';
import { SearchFilterResponse } from '../../models/search-filter/responses/search-filter-response';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';


@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    WarningPopupComponent,
    NoStringInputDirective,
    NgxMaskDirective,
  ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent implements OnInit{

  isFormValid: boolean = false;
  @Output() customerList = new EventEmitter<SearchFilterResponse[]>();
  customers: any = [];
  form: FormGroup = this.fb.group({
    nationalityIdentity:['', [Validators.pattern(/^\d{11}$/)]],
    id:[''],
    accountNumber:[''],
    gsmNumber:['',
      [
        Validators.pattern("^\d{10}$")
      ]
    ],
    firstname:[''],
    lastname:[''],
    orderNumber:[''],
  })

  constructor(
    private fb: FormBuilder,
    private searchApiService: SearchApiService,
    private router: Router,
    private change: ChangeDetectorRef,
  )
  {
    this.form.valueChanges.subscribe(()=>{
      this.isFormValid = this.form.valid &&
      (this.form.get('nationalityIdentity'))?.value ||
      (this.form.get('id'))?.value ||
      (this.form.get('accountNumber'))?.value ||
      (this.form.get('gsmNumber'))?.value ||
      (this.form.get('firstname'))?.value ||
      (this.form.get('lastname'))?.value ||
      (this.form.get('orderNumber'))?.value;
    })
  }

  ngOnInit(): void {}

  onClear() {
    this.form.reset();
    this.getFilters();
    window.location.href = `${window.location.origin}/home`;
    this.change.markForCheck();
    }

  onSubmit(){
    this.getFilters();
    this.change.markForCheck();
  }

  getFilters(){
    const queryParams: string[] = [];
    queryParams.push(this.form.get('nationalityIdentity')?.value ? `nationalityIdentity=${this.form.get('nationalityIdentity')?.value}` : '');
    queryParams.push(this.form.get('id')?.value ? `id=${this.form.get('id')?.value}` : '');
    queryParams.push(this.form.get('accountNumber')?.value ? `accountNumber=${this.form.get('accountNumber')?.value}` : '');
    queryParams.push(this.form.get('gsmNumber')?.value ? `mobilePhone=${this.form.get('gsmNumber')?.value}` : '');
    queryParams.push(this.form.get('firstname')?.value ? `firstName=${this.form.get('firstname')?.value}` : '');
    queryParams.push(this.form.get('lastname')?.value ? `lastName=${this.form.get('lastname')?.value}` : '');
    queryParams.push(this.form.get('orderNumber')?.value ? `orderNumber=${this.form.get('orderNumber')?.value}` : '');

    const filteredQueryParams = queryParams.filter(param => param !== '');

    const queryString = filteredQueryParams.join('&');
    const apiUrl = `http://localhost:8001/search-service/api/v1/search-service?${queryString}`;

    this.searchApiService.getBySearchFilter(apiUrl).subscribe(response => {
      this.customers = response;
      this.customerList.emit(this.customers);

      this.change.markForCheck();
    })
  }


}






