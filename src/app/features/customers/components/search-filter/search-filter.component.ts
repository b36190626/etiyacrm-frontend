import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  ngOnInit(): void {

  }

  onSubmit(){
    console.log("çalıştım")
  }
}






