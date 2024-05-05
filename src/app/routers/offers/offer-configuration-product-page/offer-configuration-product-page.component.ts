import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddressInfoComponent } from '../../../features/customers/components/address-info/address-info.component';

@Component({
  selector: 'app-offer-configuration-product-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AddressInfoComponent
  ],
  templateUrl: './offer-configuration-product-page.component.html',
  styleUrl: './offer-configuration-product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferConfigurationProductPageComponent {
  products: any = [
  {
    productOfferId: 398545,
    productOfferName: "4 GB kotalı ADSL Internet" ,
    campaignId:'' ,
    price: 59.90
  },
  {
    productOfferId: 2163123,
    productOfferName: "Müşteri Modeli PR" ,
    campaignId: 1 ,
    price: 71.90
  }
]
}
