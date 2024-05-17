import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressInfoComponent } from '../../../customers/components/address-info/address-info.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { CustomerInfoAddressFormComponent } from '../customer-info-address-form/customer-info-address-form.component';

@Component({
  selector: 'app-create-billing-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddressInfoComponent,
    HeaderComponent,
    CustomerInfoAddressFormComponent
  ],
  templateUrl: './create-billing-account.component.html',
  styleUrl: './create-billing-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBillingAccountComponent { }
