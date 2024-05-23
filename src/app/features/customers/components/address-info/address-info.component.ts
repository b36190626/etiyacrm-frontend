import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CustomerAdressModalComponent } from '../../../../shared/components/customer-adress-modal/customer-adress-modal.component';

import { select, Store } from '@ngrx/store';
import { selectAddress } from '../../../../shared/stores/addresses/address.selector';
import { IdToNamePipe } from '../../../../core/pipes/idToName.pipe';
import { CitiesResponseDto } from '../../models/cities/cities-response-dto';
import { DistrictsResponseDto } from '../../models/districts/districts-response-dto';
import { setAddresses } from '../../../../shared/stores/addresses/address.action';
import { AddressItem, AddressState } from '../../../../shared/stores/addresses/address.state';

@Component({
  selector: 'app-address-info',
  standalone: true,
  imports: [CommonModule, RouterModule, CustomerAdressModalComponent, IdToNamePipe],
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInfoComponent implements OnInit {
  @ViewChild(CustomerAdressModalComponent) addressModalComponent!: CustomerAdressModalComponent;

  cities: CitiesResponseDto[] = [];
  districts: DistrictsResponseDto[] = [];
  filteredDistricts: any = [];
  isFormValid = false;
  addressList: AddressItem[] = [];
  form: any;
  showPopup: boolean = false;
  defaultSelected: boolean = false;

  constructor(
    private router: Router,
    private store: Store<AddressState>
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectAddress)).subscribe((address: AddressItem[]) => {
      this.addressList = address;
      this.defaultSelected = this.addressList.some(address => address.defaultAddress);
    });
  }

  cityTransferParent(cityList: CitiesResponseDto[]) {
    this.cities = cityList;
  }

  districtTransferParent(districtList: DistrictsResponseDto[]) {
    this.districts = districtList;
  }

  togglePopup(event: Event) {
    event?.preventDefault();
    this.showPopup = !this.showPopup;
  }

  onDefaultAddressChange(addressId:number) {
    const updatedAddressList = this.addressList.map(address => ({
      ...address,
      defaultAddress: address.id === addressId
    }));

    this.store.dispatch(setAddresses({ addresses: updatedAddressList }));
    this.defaultSelected = true;
    console.log(updatedAddressList);
  }

  updateNextButtonState(valid: boolean) {
    this.isFormValid = valid;
  }

  onPrevious() {
    this.router.navigate(['/create-customer']);
  }

  onNext() {
    this.router.navigate(['/create-customer/contact-medium']);
  }


  editAddress(id: number) {
    const addressToEdit = this.addressList.find(address => address.id === id);
    if (addressToEdit) {
      this.addressModalComponent.populateForm(addressToEdit);
      this.store.dispatch(setAddresses({ addresses: this.addressList.map(address => address.id === id ? { ...address, ...addressToEdit } : address) }));
    }
  }


  deleteAddress(address: AddressItem) {
    this.addressList = this.addressList.filter(addr => addr.id !== address.id);
    this.store.dispatch(setAddresses({ addresses: this.addressList }));
  }
}
