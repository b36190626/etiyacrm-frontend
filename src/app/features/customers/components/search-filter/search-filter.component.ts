import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
import { NoStringInputDirective } from '../../../../core/directives/no-string-input.directive';


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
  form: FormGroup = this.fb.group({
    id:[''],
    customerId:[''],
    accountNumber:[''],
    gsmNumber:[''],
    firstname:[''],
    lastname:[''],
    orderNumber:[''],
  })
  constructor(
    private fb: FormBuilder,
  )
  {
    this.form.valueChanges.subscribe(()=>{
      this.isFormValid = this.form.valid &&
      (this.form.get('id'))?.value ||
      (this.form.get('customerId'))?.value ||
      (this.form.get('accountNumber'))?.value ||
      (this.form.get('gsmNumber'))?.value ||
      (this.form.get('firstname'))?.value ||
      (this.form.get('lastname'))?.value ||
      (this.form.get('orderNumber'))?.value;
    })

  }

  ngOnInit(): void {

  }

  onSubmit(){
    console.log("çalıştım")
  }
}






