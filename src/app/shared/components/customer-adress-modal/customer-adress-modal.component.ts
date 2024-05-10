import { AddressResponseDto } from './../../../features/customers/models/address/address-response-dto';
import { AddressApiService } from './../../../features/customers/services/addressApi.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CreateAddressRequest } from '../../../features/customers/models/address/requests/create-address-request';
import { selectAddress } from '../../stores/addresses/address.selector';
import { setAddress } from '../../stores/addresses/address.action';

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
  customerId!: String;
  cityDistrictInfo!:AddressResponseDto;
  addressForm !: FormGroup;
  isFormValid: boolean = false;
  cities: any = [];
  districts: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private addressApiService: AddressApiService,
    private store: Store<{ address: CreateAddressRequest}>
  ) {}

  ngOnInit() {
    this.createForm();

    this.store
    .pipe(select(selectAddress))
    .subscribe((address) => {
      this.addressForm.patchValue(address);
      console.log('addressState: ', address);
    });
    this.addressApiService.getCities().subscribe(data => {
      this.cities = data;
    });
    this.addressApiService.getById(this.customerId).subscribe(data => {
      this.districts = [];
      if (data) {
        this.addressApiService.getDistricts().subscribe(data => {
          this.districts = data;
    })}});
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
      flatNumber: [null, Validators.required],
      description: ['', Validators.required]
    })
  }

  createAddress() {
    const address: CreateAddressRequest = {
      city: this.addressForm.value.city,
      street: this.addressForm.value.street,
      district: this.addressForm.value.district,
      flatNumber: this.addressForm.value.flatNumber,
      description: this.addressForm.value.description,
    };
    this.store.dispatch(setAddress({ address }));
    this.router.navigate(['/create-customer/contact-medium']);
  }

  onSubmit() {
    if (this.addressForm.valid) {
      console.log('Form Submitted!', this.addressForm.value);
      this.createAddress();
    }

  }

  onCancel() {
    this.addressForm.reset();
  }
}
