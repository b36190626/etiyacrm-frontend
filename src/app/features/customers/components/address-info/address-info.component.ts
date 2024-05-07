import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerAdressModalComponent } from '../../../../shared/components/customer-adress-modal/customer-adress-modal.component';


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
export class AddressInfoComponent {
  form: any;
  showPopup: boolean = false;
constructor(){}

togglePopup(event: Event) {
  event?.preventDefault();
  this.showPopup = !this.showPopup;
}


}
