import { CustomerApiService } from './../../../customers/services/customerApi.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerUpdateRequest } from '../../../customers/models/customer/requests/customer-update-request';
import { NoStringInputDirective } from '../../../../core/directives/no-string-input.directive';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
import { ConfirmExitComponent } from '../../../../shared/components/confirm-exit/confirm-exit.component';
import { MessageService } from '../../../customers/services/message.service';
import { tcValidator } from '../../../customers/components/demographic-form/tcValidator';

@Component({
  selector: 'app-customer-info-update-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NoStringInputDirective,
    ControlErrorMessagePipe,
    WarningPopupComponent,
    ConfirmExitComponent,
  ],
  templateUrl: './customer-info-update-form.component.html',
  styleUrl: './customer-info-update-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoUpdateFormComponent implements OnInit {
  customerUpdateForm!: FormGroup;
  isFormValid: boolean = false;
  pathId!: string;
  showConfirmation = false;
  errorMessage : string;
  isNationalityIdentityDuplicated: boolean;
  isCustomerReal: boolean;
  @ViewChild(ConfirmExitComponent) confirmExitComponent: ConfirmExitComponent;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerApiService: CustomerApiService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((params) => {
        this.pathId = params['id'];
        this.cdr.markForCheck();
        this.getCustomerInfo();
      });

    this.customerUpdateForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      fatherName: [''],
      motherName: [''],
      nationalityIdentity: ['', [Validators.required, tcValidator()]],
    });
    this.customerUpdateForm.statusChanges.subscribe((status) => {
      this.isFormValid = status === 'VALID';
    });
  }

  getCustomerInfo() {
    this.customerApiService.getById(this.pathId).subscribe({
      next: (customerDetails) => {
        this.customerUpdateForm.patchValue({
          firstName: customerDetails.firstName,
          middleName: customerDetails.middleName,
          lastName: customerDetails.lastName,
          birthDate: customerDetails.birthDate,
          gender: customerDetails.gender,
          fatherName: customerDetails.fatherName,
          motherName: customerDetails.motherName,
          nationalityIdentity: customerDetails.nationalityIdentity,
        });
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching customer details', error);
      },
    });
  }
  updateCustomer() {
    if (this.showConfirmation) {
      return;
    }
    const request: CustomerUpdateRequest = {
      customerId: this.pathId,
      firstName: this.customerUpdateForm.value.firstName,
      middleName: this.customerUpdateForm.value.middleName,
      lastName: this.customerUpdateForm.value.lastName,
      birthDate: this.customerUpdateForm.value.birthDate,
      gender: this.customerUpdateForm.value.gender,
      fatherName: this.customerUpdateForm.value.fatherName,
      motherName: this.customerUpdateForm.value.motherName,
      nationalityIdentity: this.customerUpdateForm.value.nationalityIdentity,
    };
    this.customerApiService.putCustomer(this.pathId, request)
    .subscribe({
      next: () => {
        this.messageService.setmessage('Changes are Saved');
      },
      error: (error) => {
        this.errorMessage = error.error.detail;
        this.errorMessage = this.errorMessage.replace(/"/g, '');
        this.cdr.markForCheck();
      },
      complete: () => {
        this.customerUpdateForm.reset();
        this.router.navigate(['/home/customer/', this.pathId, 'info']);
      },
    });
  }

  checkIfNationalityIdentityDuplicated() {
    console.log('customerNatID: ', this.customerUpdateForm.value.nationalityIdentity);
    return new Promise<void>((resolve, reject) => {
      this.customerApiService
        .checkNationalityIdentityDuplicated(this.customerUpdateForm.value.nationalityIdentity)
        .subscribe({
          next: (response) => {
            this.isNationalityIdentityDuplicated = response;
            this.cdr.detectChanges();
            resolve();
          },
          error: (error) => {
            this.errorMessage = error.error.detail;
            this.errorMessage = this.errorMessage.replace(/"/g, '');
            this.cdr.detectChanges();
            reject();
          },
        });
    });
  }

  checkCustomerReal() {
    const queryParams: string[] = [];
    queryParams.push(
      this.customerUpdateForm.get('nationalityIdentity')?.value
        ? `nationalityIdentity=${
            this.customerUpdateForm.get('nationalityIdentity')?.value
          }`
        : ''
    );
    queryParams.push(
      this.customerUpdateForm.get('firstName')?.value
        ? `firstName=${this.customerUpdateForm.get('firstName')?.value}`
        : ''
    );
    queryParams.push(
      this.customerUpdateForm.get('middleName')?.value
        ? `middleName=${this.customerUpdateForm.get('middleName')?.value}`
        : ''
    );
    queryParams.push(
      this.customerUpdateForm.get('lastName')?.value
        ? `lastName=${this.customerUpdateForm.get('lastName')?.value}`
        : ''
    );
    queryParams.push(
      this.customerUpdateForm.get('birthDate')?.value
        ? `birthDate=${this.customerUpdateForm.get('birthDate')?.value}`
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
          this.cdr.detectChanges();
          reject();
        },
      });
    });

  }


  async onSubmit() {
    // if (this.customerUpdateForm.valid) {
    //   this.updateCustomer();
    // } else {
    //   this.isFormValid = false;
    // }
    this.isCustomerReal = false;
    this.isNationalityIdentityDuplicated = false;

    await this.checkCustomerReal();

    await this.checkIfNationalityIdentityDuplicated();

  setTimeout(() => {
    if (
      this.customerUpdateForm.valid &&
      this.isNationalityIdentityDuplicated === true &&
      this.isCustomerReal === true
    ) {
      console.log('Form Submitted!', this.customerUpdateForm.value);
      this.updateCustomer();
    }
  }, 0);
  }

  onCancel() {
    this.confirmExitComponent.openModal();
  }

  onConfirmCancel() {
    this.showConfirmation = false;
    this.router.navigate(['/home/customer/', this.pathId, 'info']);
  }

  onCloseConfirmation() {
    this.showConfirmation = false;
  }
}
