import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-customer-info-address-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './customer-info-address-form.component.html',
  styleUrl: './customer-info-address-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerInfoAddressFormComponent { }
