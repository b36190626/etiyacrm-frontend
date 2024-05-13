import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CustomerAdressModalComponent } from '../../../../shared/components/customer-adress-modal/customer-adress-modal.component';

import { select, Store } from '@ngrx/store';
import { selectAddress } from '../../../../shared/stores/addresses/address.selector';
import { CreateAddressRequest } from '../../models/address/requests/create-address-request';




@Component({
  selector: 'app-address-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CustomerAdressModalComponent,
  ],
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInfoComponent implements OnInit {

  addressList: CreateAddressRequest[]=[];

  optionClick: boolean=true;
  form: any;
  showPopup: boolean = false;

constructor(
  private router: Router,
  private store: Store<{ address: CreateAddressRequest}>
){}
  ngOnInit(): void {
    this.store.pipe(select(selectAddress)).subscribe((address) =>
      {
        this.addressList.push(address)

      })
  }
  isValidAddress(address: any): boolean {
    return address.city && address.district && address.street && address.flatNumber && address.description;
  }


togglePopup(event: Event) {
  event?.preventDefault();
  this.showPopup = !this.showPopup;
}

onPrevious(){
  this.router.navigate(['/create-customer']);
}
onNext(){
  this.router.navigate(['/create-customer/contact-medium']);
}
}
