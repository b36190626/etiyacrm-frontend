import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CreateAddressRequest } from '../../../features/customers/models/address/requests/create-address-request';
import { selectAddress } from '../../stores/addresses/address.selector';

@Component({
  selector: 'app-customer-adress-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
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
    private router: Router,
    private store: Store<{ address: CreateAddressRequest}>
  ) {}

  ngOnInit() {
    this.createForm();

    this.store
    .pipe(select(selectAddress))
    .subscribe((address) => {
      this.addressForm.patchValue(address);
      console.log('addressState: ', address);
    })

    this.addressForm.statusChanges.subscribe(
      status => {
        this.isFormValid = status === 'VALID';
        console.log(status);
    });
  }

  createForm() {
    this.addressForm = this.fb.group({
      city: ['', Validators.required], //city{id, name olarak tutuluyor}
      street: ['', Validators.required],
      district: ['', Validators.required],
      flatNumber: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  createAddress() {
    //adres verileri değişecek
  }


closeModal() {
throw new Error('Method not implemented.');
}
}
