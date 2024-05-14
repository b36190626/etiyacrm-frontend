import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
import { NoStringInputDirective } from '../../../../core/directives/no-string-input.directive';
import { SearchApiService } from '../../services/searchApi.service';
import { SearchFilterResponse } from '../../models/search-filter/responses/search-filter-response';


@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WarningPopupComponent,
    NoStringInputDirective
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
    nationalityIdentity:['', [
      Validators.maxLength(11),
      Validators.minLength(11),
      Validators.pattern("^[1-9]{1}[0-9]{9}[02468]{1}$")
    ]],
    customerId:[''],
    accountNumber:[''],
    gsmNumber:[''],
    firstname:[''],
    lastname:[''],
    orderNumber:[''],
  })

  constructor(
    private fb: FormBuilder,
    private searchApiService: SearchApiService,
  )
  {
    this.form.valueChanges.subscribe(()=>{
      this.isFormValid = this.form.valid &&
      (this.form.get('nationalityIdentity'))?.value ||
      (this.form.get('customerId'))?.value ||
      (this.form.get('accountNumber'))?.value ||
      (this.form.get('gsmNumber'))?.value ||
      (this.form.get('firstname'))?.value ||
      (this.form.get('lastname'))?.value ||
      (this.form.get('orderNumber'))?.value;
    })
  }

  ngOnInit(): void {}

  onSubmit(){
    this.getFilters();
  }

  getFilters(){
    const queryParams: string[] = [];
    queryParams.push(this.form.get('nationalityIdentity')?.value ? `nationalityIdentity=${this.form.get('nationalityIdentity')?.value}` : '');
    queryParams.push(this.form.get('customerId')?.value ? `customerId=${this.form.get('customerId')?.value}` : '');
    queryParams.push(this.form.get('accountNumber')?.value ? `accountNumber=${this.form.get('accountNumber')?.value}` : '');
    queryParams.push(this.form.get('gsmNumber')?.value ? `mobilePhone=${this.form.get('gsmNumber')?.value}` : '');
    queryParams.push(this.form.get('firstname')?.value ? `firstName=${this.form.get('firstname')?.value}` : '');
    queryParams.push(this.form.get('lastname')?.value ? `lastName=${this.form.get('lastname')?.value}` : '');
    queryParams.push(this.form.get('orderNumber')?.value ? `orderNumber=${this.form.get('orderNumber')?.value}` : '');

    const queryString = queryParams.join('&');
    const apiUrl = `http://localhost:8082/api/v1/search-service?${queryString}`;

    this.searchApiService.getBySearchFilter(apiUrl).subscribe(response => {
      this.customers = response;
      this.customerList.emit(this.customers);
      console.log("apiUrl",apiUrl);
      console.log("customer list response:",response);
    })
  }

}






