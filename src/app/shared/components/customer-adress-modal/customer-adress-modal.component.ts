import { AddressState } from './../../stores/addresses/address.state';
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
import { setAddress } from '../../stores/addresses/address.action';
import { NoStringInputDirective } from '../../../core/directives/no-string-input.directive';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import { selectAddress } from '../../stores/addresses/address.selector';
import { AddressItem } from '../../stores/addresses/address.state';
import { take } from 'rxjs';

@Component({
  selector: 'app-customer-adress-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NoStringInputDirective],
  templateUrl: './customer-adress-modal.component.html',
  styleUrls: ['./customer-adress-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAdressModalComponent implements OnInit {
  @ViewChild('customerAddressModal') modalElement!: ElementRef;

  addressForm!: FormGroup;
  isFormValid: boolean = false;
  cities: any = [];
  districts: any = [];
  @Output() cityList = new EventEmitter<any>();
  @Output() districtList = new EventEmitter<any>();
  filteredDistricts: any[] = [];
  editingAddressId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private addressApiService: AddressApiService,
    private store: Store<{ address: AddressState }>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.createForm();
    this.loadCitiesOnOpenModal();

    this.store.pipe(select(selectAddress)).subscribe((address) => {
      if (address) {
        this.addressForm.patchValue(address);
      }
      console.log('addressState: ', address);
    });

    this.addressForm.statusChanges.subscribe((status) => {
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
    });
  }
  populateForm(address: AddressItem) {
    const district = this.districts.find(d => d.id === address.districtId);
    const cityId = district ? district.cityId : null;
    const city = this.cities.find(c => c.id === cityId);

    if (city) {
      this.addressForm.patchValue({
        city: city.id,
        street: address.street,
        district: address.districtId,
        flatNumber: address.flatNumber,
        description: address.description
      });

      this.filteredDistricts = this.districts.filter(d => d.cityId === city.id);
      this.addressForm.get('district')?.enable();
      this.editingAddressId = address.id;
    }
  }
  loadCitiesOnOpenModal() {
    this.addressApiService.getCities().subscribe((citiesData) => {
      this.cities = citiesData;
      this.districts = [];
      if (citiesData) {
        this.addressApiService.getDistricts().subscribe((districtsData) => {
          this.districts = districtsData;
          this.districtList.emit(this.districts);
          this.cdr.detectChanges();
          console.log(districtsData);
        });
        this.cityList.emit(this.cities);
        console.log("cityList", this.cityList)
      }
    });
  }

  createAddress() {
    this.store.pipe(select(selectAddress),take(1)).subscribe(response => {
      // const nextId:number=Math.max(...response.map(r => r.id))+1
      const nextId: number = response.length ? Math.max(...response.map(r => r.id)) + 1 : 1;
      const newAddress: AddressItem = {
      street: this.addressForm.value.street,
      districtId: this.addressForm.value.district,
      flatNumber: this.addressForm.value.flatNumber,
      description: this.addressForm.value.description,
      defaultAddress: false,
      customerId: '',
      id: this.editingAddressId ?? nextId,
    };
    this.store.dispatch(setAddress({ address: newAddress }));
    this.editingAddressId = null;
    console.log(newAddress);
    })
  }

  onCityChange(cityId: any) {
    this.addressForm.get('district').reset({ value: '', disabled: true });
    if (cityId) {
      this.addressForm.get('district').enable();
      this.filteredDistricts = this.districts.filter(
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
    this.addressForm.reset({
      city: '',
      street: '',
      district: { value: '', disabled: true },
      flatNumber: null,
      description: '',
    });
    this.editingAddressId = null;
    this.addressForm.get('district')?.disable();
    this.cdr.detectChanges();
  }
}
