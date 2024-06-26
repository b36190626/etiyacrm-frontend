import { MessageService } from './../../services/message.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateCustomerRequest } from '../../models/customer/requests/create-customer-request';
import { setIndividualCustomer } from '../../../../shared/stores/customers/individual-customer.action';
import { select, Store } from '@ngrx/store';
import { selectIndividualCustomer } from '../../../../shared/stores/customers/individual-customer.selector';
import { NoStringInputDirective } from '../../../../core/directives/no-string-input.directive';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
import { tcValidator } from './tcValidator';
import { CustomerApiService } from '../../services/customerApi.service';

@Component({
  selector: 'app-demographic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NoStringInputDirective,
    ControlErrorMessagePipe,
    WarningPopupComponent,
  ],
  templateUrl: './demographic-form.component.html',
  styleUrl: './demographic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemographicFormComponent implements OnInit {
  customerForm!: FormGroup;
  isFormValid: boolean = false;
  isNationalityIdentityDuplicated: boolean;
  isCustomerReal: boolean;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private store: Store<{ individualCustomer: CreateCustomerRequest }>,
    private customerApiService: CustomerApiService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.createForm();

    this.store
      .pipe(select(selectIndividualCustomer))
      .subscribe((individualCustomer) => {
        this.customerForm.patchValue(individualCustomer);
        console.log('individualCustomerState:', individualCustomer);
        this.updateFormValidity();
      });
    this.customerForm.statusChanges.subscribe((status) => {
      this.isFormValid = status === 'VALID';
      console.log(status);
      this.updateFormValidity();
    });
  }

  createForm() {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      fatherName: [''],
      motherName: [''],
      nationalityIdentity: [
        '',
        [
          Validators.required,
          tcValidator(),
        ],
      ],
    });
    this.customerForm.valueChanges.subscribe(() => {
      this.updateFormValidity();
    });
  }

  updateFormValidity() {
    this.isFormValid = this.customerForm.valid;
    this.cdr.detectChanges();
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

  checkIfNationalityIdentityDuplicated() {
    console.log('customerNatID: ', this.customerForm.value.nationalityIdentity);
    return new Promise<void>((resolve, reject) => {
      this.customerApiService
        .checkNationalityIdentityDuplicated(this.customerForm.value.nationalityIdentity)
        .subscribe({
          next: (response) => {
            this.isNationalityIdentityDuplicated = response;
            this.cdr.detectChanges();
            resolve();
          },
          error: (error) => {
            this.errorMessage = error.error.detail;
            this.errorMessage = this.errorMessage.replace(/"/g, '');
            //this.messageService.setmessage(this.errorMessage);
            this.cdr.detectChanges();
            reject();
          },
        });
    });
  }

  checkCustomerReal() {
    const queryParams: string[] = [];
    queryParams.push(
      this.customerForm.get('nationalityIdentity')?.value
        ? `nationalityIdentity=${
            this.customerForm.get('nationalityIdentity')?.value
          }`
        : ''
    );
    queryParams.push(
      this.customerForm.get('firstName')?.value
        ? `firstName=${this.customerForm.get('firstName')?.value}`
        : ''
    );
    queryParams.push(
      this.customerForm.get('middleName')?.value
        ? `middleName=${this.customerForm.get('middleName')?.value}`
        : ''
    );
    queryParams.push(
      this.customerForm.get('lastName')?.value
        ? `lastName=${this.customerForm.get('lastName')?.value}`
        : ''
    );
    queryParams.push(
      this.customerForm.get('birthDate')?.value
        ? `birthDate=${this.customerForm.get('birthDate')?.value}`
        : ''
    );
    const fullQueryParams = queryParams.filter((param) => param !== '');

    const queryString = fullQueryParams.join('&');
    const apiUrl = `http://localhost:8001/customerservice/api/v1/individualcustomers/check-customer-real?${queryString}`;

    return new Promise<void>((resolve, reject) => {
      this.customerApiService.checkCustomerReal(apiUrl).subscribe({
        next: (response) => {
          if (response === true) {
            this.isCustomerReal = true;
            this.cdr.detectChanges();
          }
          resolve();
        },
        error: (error) => {
          this.errorMessage = error.error.detail;
          this.errorMessage = this.errorMessage.replace(/"/g, '');
          //this.messageService.setmessage(this.errorMessage);
          this.cdr.detectChanges();
          reject();
        },
      });
    });

  }

  async onSubmit() {
    this.isCustomerReal = false;
    this.isNationalityIdentityDuplicated = false;

    await this.checkCustomerReal();

    await this.checkIfNationalityIdentityDuplicated();

  setTimeout(() => {
    if (
      this.customerForm.valid &&
      this.isNationalityIdentityDuplicated === true &&
      this.isCustomerReal === true
    ) {
      console.log('Form Submitted!', this.customerForm.value);
      this.createCustomer();
    }
  }, 0);
}


  onCancel() {
    this.customerForm.reset();
    this.router.navigate(['/home']);
  }
}
