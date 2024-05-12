import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CustomerAdressModalComponent } from '../../../../shared/components/customer-adress-modal/customer-adress-modal.component';
import { CreateAddressRequest } from '../../models/address/requests/create-address-request';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllAddresses } from '../../../../shared/stores/addresses/address.selector';


@Component({
  selector: 'app-address-info',
  template: `
  <div *ngFor="let address of addresses$ | async">
    <p>{{ address.street }}, {{ address.city }}</p>
  </div>
`,
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
  addresses$: Observable<CreateAddressRequest[]>;
  addressList: Array<any>=["samipaşazade"]; //doldur
  optionClick: boolean=true;
  form: any;
  showPopup: boolean = false;

constructor(
  private router: Router,
  private store: Store
){
  this.addresses$ = this.store.pipe(select(selectAllAddresses));
}
  ngOnInit(): void {

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
