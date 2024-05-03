import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-address-popup.component.html',
  styleUrl: './add-address-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAddressPopupComponent implements OnInit{
  addressForm !: FormGroup;
  isFormValid: boolean = false;
  isOpen: boolean = true

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

  openModal(){
    this.isOpen = true;
  }
  closeModal(){
    this.isOpen = false;
  }
}
