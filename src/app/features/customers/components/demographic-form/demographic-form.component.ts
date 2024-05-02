import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

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
export class DemographicFormComponent {
  customerForm!: FormGroup;

  isFormValid: boolean = false; //bootstrpsiz angular ile form validasyon takibi yaptım

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.customerForm = this.fb.group({

      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      fatherName: new FormControl(''),
      motherName: new FormControl(''),
      nationalityId: new FormControl('', Validators.required)
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
    }
  }

  onCancel() {
    this.customerForm.reset();
  }
}
