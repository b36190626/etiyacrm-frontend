import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class ContactMediumInfoUpdateFormComponent implements OnInit {
  contactMediumInfoUpdateForm!: FormGroup ;
  isFormValid: boolean = false;

  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.contactMediumInfoUpdateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      homePhone: [''],
      mobilePhone: ['', Validators.required],
      fax: ['']
    });
    this.contactMediumInfoUpdateForm.statusChanges.subscribe(status => {
      this.isFormValid = status === 'VALID';
    })
  }

  onSubmit() {
    if (this.contactMediumInfoUpdateForm.valid) {
      this.isFormValid = true;
      console.log(this.contactMediumInfoUpdateForm.value);
    } else {
      this.isFormValid = false;
      console.log("Form geçersiz.");
    }
  }
}


