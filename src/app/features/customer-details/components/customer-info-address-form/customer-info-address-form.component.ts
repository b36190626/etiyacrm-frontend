import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GetAddressRequest } from '../../../customers/models/address/requests/get-address-request';
import { AddressApiService } from '../../../customers/services/addressApi.service';

@Component({
  selector: 'app-customer-info-address-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './customer-info-address-form.component.html',
  styleUrl: './customer-info-address-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoAddressFormComponent implements OnInit {
  customerId!: string;
  addressInfo!: GetAddressRequest[];
  optionClick: boolean=true;

  constructor(
    private addressApiService: AddressApiService,
    private change: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(params => {
      this.customerId = params['id'];
    }).unsubscribe();
    this.getAddress();
  }

  getAddress(){
    this.addressApiService.getById(this.customerId).subscribe({
      next: (addressDetails) => {
        this.addressInfo = addressDetails;
        console.log(addressDetails, "oldu");
      },
      complete: () => {
        this.change.markForCheck();
      }
    })
  }
}
