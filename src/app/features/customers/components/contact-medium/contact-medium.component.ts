import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-medium',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './contact-medium.component.html',
  styleUrl: './contact-medium.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMediumComponent implements OnInit {
  contactForm!: FormGroup;

  isFormValid: boolean = false; //bootstrpsiz angular ile form validasyon takibi yaptım

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.contactForm = this.fb.group({

      email: ['', Validators.required],
      homephone: [''],
      mobilephone: ['', Validators.required],
      fax: ['']
    });
    // Formun durumunu dinamik olarak izleme
    this.contactForm.statusChanges.subscribe(status => {
    this.isFormValid = status === 'VALID';
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);
    }
  }

  onCancel() {
    this.contactForm.reset();
  }
}
