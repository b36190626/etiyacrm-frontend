import { AddressApiService } from './../../../features/customers/services/addressApi.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CreateAddressRequest } from '../../../features/customers/models/address/requests/create-address-request';
import { setAddress } from '../../stores/addresses/address.action';
import { NoStringInputDirective } from '../../../core/directives/no-string-input.directive';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { selectAddress } from '../../stores/addresses/address.selector';

@Component({
  selector: 'app-customer-adress-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NoStringInputDirective],
  templateUrl: './customer-adress-modal.component.html',
  styleUrl: './customer-adress-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAdressModalComponent implements OnInit {
  addressForm!: FormGroup;
  @Output() formValid = new EventEmitter<boolean>();
  isFormValid: boolean = false;
  cities: any = [];
  districts: any = [];
  @Output() cityList = new EventEmitter<any>();
  @Output() districtList = new EventEmitter<any>();
  filteredDistricts: any[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private addressApiService: AddressApiService,
    private store: Store<{ address: CreateAddressRequest }>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.createForm();
    this.loadCitiesOnOpenModal();

    this.store.pipe(select(selectAddress)).subscribe((address) => {
      this.addressForm.patchValue(address),
        console.log('addressState: ', address);

    });

    this.addressForm.statusChanges.subscribe((status) => {
      this.formValid.emit(status === 'VALID');
      this.isFormValid = status === 'VALID';
      console.log(status);
    });
  }

  createForm() {
    this.addressForm = this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      district: [{ value: '', disabled: true }, Validators.required],
      flatNumber: [null, Validators.required],
      description: ['', Validators.required],
      isDefault: [false, Validators.required], //if isDefault changes, don't allow to check gibi birşey yapalım.
    });
  }


  loadCitiesOnOpenModal() {
    this.addressApiService.getCities().subscribe((citiesData) => {
      this.cities = citiesData;
      this.districts = [];
      if (citiesData) {


        this.addressApiService.getDistricts().subscribe((districtsData) => {
          this.districts = districtsData;
          this.districtList.emit(this.districts);
          this.cdr.detectChanges(); // LAĞNET olsun HALA UNUTUYORUZ
          console.log(districtsData);
        })
        this.cityList.emit(this.cities);
        //this.districtList.emit(this.districts);
        console.log("cityList", this.cityList)
      }
    });
  }

  createAddress() {
    const newAddress: CreateAddressRequest = {
      //city: this.addressForm.value.city, //city district.id den gelecek
      street: this.addressForm.value.street,
      districtId: this.addressForm.value.district,
      flatNumber: this.addressForm.value.flatNumber,
      description: this.addressForm.value.description,
      defaultAddress: this.addressForm.value.isDefault,
      customerId:'',
    };

    this.store.dispatch(setAddress({ address: newAddress }));
    console.log(newAddress);
  }


  onCityChange(cityId: any) {
    this.addressForm.get('district').reset({ value: '', disabled: true });
    if (cityId) {
      this.addressForm.get('district').enable();
      this.filteredDistricts= this.districts.filter(
        (district) => district.cityId === cityId
      );

    } else {
      this.addressForm.get('district').disable();
    }
  }


  onSubmit() {
    if (this.addressForm.valid) {
      console.log('Form Created on Modal', this.addressForm.value);
      this.createAddress();
      this.router.navigate(['/create-customer/address-info']);
    }
  }

  onCancel() {
    console.log("Form values before reset:", this.addressForm.value);
    this.addressForm.reset({
      city: '',
      street: '',
      district: { value: '', disabled: true },
      flatNumber: null,
      description: '',
      isDefault: false
    });
    this.addressForm.get('district').disable();
    this.cdr.detectChanges();
    console.log("Form values after reset:", this.addressForm.value);
  }
  }
