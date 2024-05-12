import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CustomerAdressModalComponent } from '../../../../shared/components/customer-adress-modal/customer-adress-modal.component';
import { Store, select } from '@ngrx/store';
import { selectAllAddresses } from '../../../../shared/stores/addresses/address.selector';
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
  // addresses$: Array<any>=["samipaşazade"]; //doldur
  // addressList: Array<any>=["samipaşazade"]; //doldur
  optionClick: boolean=true;
  form: any;
  showPopup: boolean = false;
  allAdressess: CreateAddressRequest[];

constructor(
  private router: Router,
  private store: Store
){
  //this.addresses$ = this.store.pipe(select(selectAllAddresses));
}
  ngOnInit(): void {
    this.store
    .pipe(select(selectAllAddresses))
    .subscribe((address) => {
      console.log('addressState: ', address);
      this.allAdressess = address;
    })
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
