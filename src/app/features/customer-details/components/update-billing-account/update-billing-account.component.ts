import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { AddressInfoComponent } from '../../../customers/components/address-info/address-info.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-billing-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    NavbarComponent,
    AddressInfoComponent,
  ],
  templateUrl: './update-billing-account.component.html',
  styleUrl: './update-billing-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBillingAccountComponent { }
