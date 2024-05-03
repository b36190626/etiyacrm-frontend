import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-adress-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './customer-adress-modal.component.html',
  styleUrl: './customer-adress-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAdressModalComponent implements OnInit {
  addressForm !: FormGroup;
  isFormValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.addressForm = this.fb.group({
      city: ['', Validators.required], //city{id, name olarak tutuluyor}
      street: ['', Validators.required],
      district: ['', Validators.required],
      flatNumber: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.addressForm.statusChanges.subscribe(
      status => {
        this.isFormValid = status === 'VALID';
        console.log(status);
    });
  }
closeModal() {
throw new Error('Method not implemented.');
}
}
