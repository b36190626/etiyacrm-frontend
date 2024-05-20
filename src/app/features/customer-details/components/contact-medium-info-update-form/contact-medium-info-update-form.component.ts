import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UpdateContactMediumRequest } from '../../../customers/models/contact-medium/requests/update-contact-medium-request';
import { ContactMediumApiService } from '../../../customers/services/contactMediumApi.service';
import { NoStringInputDirective } from '../../../../core/directives/no-string-input.directive';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
import { ConfirmExitComponent } from '../../../../shared/components/confirm-exit/confirm-exit.component';
import { MessageService } from '../../../customers/services/message.service';

@Component({
  selector: 'app-contact-medium-info-update-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NoStringInputDirective,
    ControlErrorMessagePipe,
    NgxMaskDirective,
    WarningPopupComponent,
    ConfirmExitComponent,
  ],
  templateUrl: './contact-medium-info-update-form.component.html',
  styleUrl: './contact-medium-info-update-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMediumInfoUpdateFormComponent implements OnInit {
  contactMediumInfoUpdateForm!: FormGroup;
  isFormValid: boolean = false;
  pathId!: string;
  customerId!: string;
  showConfirmation = false;
  @ViewChild(ConfirmExitComponent) confirmExitComponent: ConfirmExitComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactMediumApiService: ContactMediumApiService,
    private fb: FormBuilder,
    private router: Router,
    private change: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  onKeyDown(event: any) {
    if (event.keyCode !== 8 && event.target.selectionStart === 0) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.pathId = params['id'];

      this.customerId = history.state.customerId;
      console.log(this.customerId, 'geldi looo');
      this.change.markForCheck();
      this.getContactMediumInfo();
    });

    this.contactMediumInfoUpdateForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        this.emailDomainValidator
      ]],
      homePhone: [''],
      mobilePhone: ['', Validators.required],
      fax: [''],
    });
    this.contactMediumInfoUpdateForm.statusChanges.subscribe((status) => {
      this.isFormValid = status === 'VALID';
    });
  }


  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.includes('@')) {
      const [_, domain] = email.split('@');
      if (domain !== 'gmail.com' && domain !== 'yahoo.com') {
        return { 'invalidDomain': true };
      }
    }
    return null;
  }

  getContactMediumInfo() {
    this.contactMediumApiService.getById(this.customerId).subscribe({
      next: (contactMediumDetails) => {
        this.contactMediumInfoUpdateForm.patchValue({
          email: contactMediumDetails.email,
          homePhone: contactMediumDetails.homePhone,
          mobilePhone: contactMediumDetails.mobilePhone,
          fax: contactMediumDetails.fax,
        });
        this.change.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching contact medium details', error);
      },
    });
  }

  updateContactMedium() {
    const request: UpdateContactMediumRequest = {
      email: this.contactMediumInfoUpdateForm.value.email,
      homePhone: this.contactMediumInfoUpdateForm.value.homePhone,
      mobilePhone: this.contactMediumInfoUpdateForm.value.mobilePhone,
      fax: this.contactMediumInfoUpdateForm.value.fax,
    };
    this.contactMediumApiService
      .putContactMedium(this.pathId, request)
      .subscribe({
        next: (response) => {
          this.messageService.setmessage('Changes are Saved');
        },
        error: (error) => {
          console.error('Error', error);
        },
        complete: () => {
          this.contactMediumInfoUpdateForm.reset();
          this.router.navigate([
            '/home/customer/',
            this.customerId,
            'contact-medium-info',
          ]);
        },
      });
  }

  onSubmit() {
    if (this.contactMediumInfoUpdateForm.valid) {
      this.isFormValid = true;
      this.updateContactMedium();
    } else {
      this.isFormValid = false;
    }
  }

  onCancel() {
    this.confirmExitComponent.openModal();
  }

  onConfirmCancel() {
    this.showConfirmation = false;
    this.router.navigate([
      '/home/customer/',
      this.customerId,
      'contact-medium-info',
    ]);
  }

  onCloseConfirmation() {
    this.showConfirmation = false;
  }
}
