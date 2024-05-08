import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateCustomerRequest } from '../../models/customer/requests/create-customer-request';
import { setIndividualCustomer } from '../../../../shared/stores/customers/individual-customer.action';
import { select, Store } from '@ngrx/store';
import { selectIndividualCustomer } from '../../../../shared/stores/customers/individual-customer.selector';

@Component({
  selector: 'app-demographic-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
  ],
  templateUrl: './demographic-form.component.html',
  styleUrl: './demographic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemographicFormComponent implements OnInit {
  customerForm!: FormGroup;
  isFormValid: boolean = false; //bootstrpsiz angular ile form validasyon takibi yaptım

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{ individualCustomer: CreateCustomerRequest }>
  ) {}
  ngOnInit() {

    this.createForm();

    this.store
      .pipe(select(selectIndividualCustomer))
      .subscribe((individualCustomer) => {
        this.customerForm.patchValue(individualCustomer);
        console.log('individualCustomerState:', individualCustomer);
      });
    // Formun durumunu dinamik olarak izleme
    this.customerForm.statusChanges.subscribe(status => {
    this.isFormValid = status === 'VALID';
    console.log("status");
});
  }

  createForm(){
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      fatherName: [''],
      motherName: [''],
      nationalityIdentity: ['', Validators.required]
    });
  }

  createCustomer() {
    const individualCustomer: CreateCustomerRequest = {
      firstName: this.customerForm.value.firstName,
      middleName: this.customerForm.value.middleName,
      lastName: this.customerForm.value.lastName,
      gender: this.customerForm.value.gender,
      motherName: this.customerForm.value.motherName,
      fatherName: this.customerForm.value.fatherName,
      birthDate: this.customerForm.value.birthDate,
      nationalityIdentity: this.customerForm.value.nationalityIdentity,
    };
    this.store.dispatch(setIndividualCustomer({ individualCustomer }));
    this.router.navigate(['/create-customer/address-info']);
  }

  onSubmit() {
    if (this.customerForm.valid) {
      console.log('Form Submitted!', this.customerForm.value);
    }
    this.createCustomer();
  }

  onCancel() {
    this.customerForm.reset();
    this.router.navigate(['/home/search'])
  }
}
