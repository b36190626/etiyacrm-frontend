import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddAddressPopupComponent } from '../../../../../shared/components/add-address-popup/add-address-popup.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-address-info',
  standalone: true,
  imports: [
    CommonModule,RouterModule,
    AddAddressPopupComponent
  ],
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInfoComponent {
  form: any;
  showPopup: boolean = false;
constructor(){}

togglePopup(event: Event) {
  event?.preventDefault();
  this.showPopup = !this.showPopup;
}
}
