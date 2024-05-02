import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}
  ngOnInit() {
    this.customerForm = this.fb.group({

      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      fatherName: [''],
      motherName: [''],
      nationalityId: ['', Validators.required]
    });
    // Formun durumunu dinamik olarak izleme
    this.customerForm.statusChanges.subscribe(status => {
    this.isFormValid = status === 'VALID';
    console.log(status);
});
  }

  onSubmit() {
    if (this.customerForm.valid) {
      console.log('Form Submitted!', this.customerForm.value);
      this.router.navigate(['/home/create-customer/contact-medium'])
    }
  }

  onCancel() {
    this.customerForm.reset();
  }
}
