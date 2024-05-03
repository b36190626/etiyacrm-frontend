import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-info-update-form',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule, RouterModule
  ],
  templateUrl: './customer-info-update-form.component.html',
  styleUrl: './customer-info-update-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoUpdateFormComponent implements OnInit {
  customerUpdateForm!: FormGroup;
  isFormValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.customerUpdateForm = this.fb.group({

      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      fatherName: [''],
      motherName: [''],
      nationalityId: ['', Validators.required]
    });
    this.customerUpdateForm.statusChanges.subscribe(status => {
    this.isFormValid = status === 'VALID';
    console.log("status");
});
  }

  onSubmit() {
    if (this.customerUpdateForm.valid) {
      console.log('Form Submitted!', this.customerUpdateForm.value);
      this.router.navigate(['home/customer'])
    }
  }
}

