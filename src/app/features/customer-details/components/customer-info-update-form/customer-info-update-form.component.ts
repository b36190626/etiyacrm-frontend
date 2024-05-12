import { CustomerApiService } from './../../../customers/services/customerApi.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerUpdateRequest } from '../../../customers/models/customer/requests/customer-update-request';
import { NoStringInputDirective } from '../../../../core/directives/no-string-input.directive';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';

@Component({
  selector: 'app-customer-info-update-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NoStringInputDirective,
    ControlErrorMessagePipe,
    WarningPopupComponent
  ],
  templateUrl: './customer-info-update-form.component.html',
  styleUrl: './customer-info-update-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoUpdateFormComponent implements OnInit {
  customerUpdateForm!: FormGroup;
  isFormValid: boolean = false;
  pathId!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerApiService: CustomerApiService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
    this.pathId = params['id'];
    console.log('pathID:', this.pathId);

    }).unsubscribe();


    this.customerUpdateForm = this.fb.group({

      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      fatherName: [''],
      motherName: [''],
      nationalityIdentity: ['', [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
        Validators.pattern("^[1-9]{1}[0-9]{9}[02468]{1}$")
      ]]
    });
    this.customerUpdateForm.statusChanges.subscribe(status => {
    this.isFormValid = status === 'VALID';
});
  }
  updateCustomer(){
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
    this.customerApiService.putCustomer(this.pathId, request).subscribe({
      next: (response) =>{},
      error: (error) => {
        console.error('Error', error)
      },
      complete: () => {
        this.customerUpdateForm.reset();
        this.router.navigate(['/home/customer/',this.pathId ,'info'])
      }
    })
  }

  onSubmit() {
    if (this.customerUpdateForm.valid) {
      console.log('Form Submitted!', this.customerUpdateForm.value);
      this.updateCustomer();
    }
  }
}
