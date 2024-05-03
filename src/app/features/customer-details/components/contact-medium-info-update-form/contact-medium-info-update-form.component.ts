import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-medium-info-update-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './contact-medium-info-update-form.component.html',
  styleUrl: './contact-medium-info-update-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMediumInfoUpdateFormComponent {
  ContactMediumInfoUpdateForm: FormGroup ;
  isFormValid: boolean = false;

  constructor(private fb: FormBuilder) {
    this.ContactMediumInfoUpdateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      homePhone: [''],
      mobilePhone: ['', Validators.required],
      fax: ['']
    });
  }

  onSubmit() {
    if (this.ContactMediumInfoUpdateForm.valid) {
      this.isFormValid = true;
      console.log(this.ContactMediumInfoUpdateForm.value);
    } else {
      this.isFormValid = false;
      console.log("Form geçersiz.");
    }
  }
}


