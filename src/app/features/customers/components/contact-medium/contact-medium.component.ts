import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CreateContactMediumRequest } from '../../models/contact-medium/requests/create-contact-medium-request';
import { setContactMedium } from '../../../../shared/stores/contact-medium/contact-medium.action';
import { selectContactMedium } from '../../../../shared/stores/contact-medium/contact-medium.selector';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';
import { NoStringInputDirective } from '../../../../core/directives/no-string-input.directive';
import { MobilePhoneFormatDirective } from '../../../../core/directives/mobile-phone-format.directive';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-contact-medium',
  standalone: true,
  providers: [
    provideNgxMask(),
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlErrorMessagePipe,
    NoStringInputDirective,
    MobilePhoneFormatDirective,
    NgxMaskDirective
  ],
  templateUrl: './contact-medium.component.html',
  styleUrl: './contact-medium.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMediumComponent implements OnInit {
  contactForm!: FormGroup;
  isFormValid: boolean = false; //bootstrpsiz angular ile form validasyon takibi yaptım

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{ contactMedium: CreateContactMediumRequest }>
  ) {}

  onKeyDown(event: any) {
    if (event.keyCode !== 8 && event.target.selectionStart === 0) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    this.createForm();

    this.store
      .pipe(select(selectContactMedium))
      .subscribe((contactMedium) => {
        this.contactForm.patchValue(contactMedium);
        console.log('contactMediumState:', contactMedium);
      });

    // Formun durumunu dinamik olarak izleme
    this.contactForm.statusChanges.subscribe(status => {
    this.isFormValid = status === 'VALID';
    });
  }

  createForm(){
    this.contactForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      homePhone: [''],
      mobilePhone: ['', Validators.required],
      fax: ['']
    });
  }

  createContactMedium(){
    const contactMedium: CreateContactMediumRequest = {
      email: this.contactForm.value.email,
      homePhone: this.contactForm.value.email,
      mobilePhone: this.contactForm.value.email,
      fax: this.contactForm.value.email,
      customerId: this.contactForm.value.customerId //bu request içinde olduğu için yazmak zorunda kaldım
    };
    this.store.dispatch(setContactMedium({ contactMedium }));
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);
    }
    this.createContactMedium();
  }

  onCancel() {
    this.contactForm.reset();
    this.router.navigate(['/create-customer/address-info'])
  }
}
