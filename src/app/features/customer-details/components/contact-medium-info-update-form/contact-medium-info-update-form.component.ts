import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UpdateContactMediumRequest } from '../../../customers/models/contact-medium/requests/update-contact-medium-request';
import { ContactMediumApiService } from '../../../customers/services/contactMediumApi.service';
import { NoStringInputDirective } from '../../../../core/directives/no-string-input.directive';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
import { SuccessPopupComponent } from '../../../../shared/components/success-popup/success-popup.component';

@Component({
  selector: 'app-contact-medium-info-update-form',
  standalone: true,
  providers: [
    provideNgxMask(),
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NoStringInputDirective,
    ControlErrorMessagePipe,
    NgxMaskDirective,
    WarningPopupComponent,
    SuccessPopupComponent
  ],
  templateUrl: './contact-medium-info-update-form.component.html',
  styleUrl: './contact-medium-info-update-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMediumInfoUpdateFormComponent implements OnInit {
  contactMediumInfoUpdateForm!: FormGroup ;
  isFormValid: boolean = false;
  pathId!: string;
  customerId!: string;
  isSuccess: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactMediumApiService: ContactMediumApiService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  onKeyDown(event: any) {
    if (event.keyCode !== 8 && event.target.selectionStart === 0) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(params =>{
      this.pathId = params['id'];
    });

    this.contactMediumInfoUpdateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      homePhone: [''],
      mobilePhone: ['', Validators.required],
      fax: ['']
    });
    this.contactMediumInfoUpdateForm.statusChanges.subscribe(status => {
      this.isFormValid = status === 'VALID';
    })

    this.activatedRoute.paramMap.subscribe(params => {
      this.customerId = params.get("customerId")!;
      console.log("customerAydiiii =", this.customerId)
    })

  }

  updateContactMedium(){
    const request: UpdateContactMediumRequest = {
      email: this.contactMediumInfoUpdateForm.value.email,
      homePhone: this.contactMediumInfoUpdateForm.value.homePhone,
      mobilePhone: this.contactMediumInfoUpdateForm.value.mobilePhone,
      fax: this.contactMediumInfoUpdateForm.value.fax,
    };
    this.contactMediumApiService.putContactMedium(this.pathId, request).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('Error', error)
      },
      complete: () => {
        this.contactMediumInfoUpdateForm.reset();
        this.router.navigate(['/home/customer/', this.customerId , 'contact-medium-info'])
        this.isSuccess = true;
      }
    })
  }

  onSubmit() {
    if (this.contactMediumInfoUpdateForm.valid) {
      this.isFormValid = true;
      this.updateContactMedium();
    } else {
      this.isFormValid = false;
    }
  }
}
