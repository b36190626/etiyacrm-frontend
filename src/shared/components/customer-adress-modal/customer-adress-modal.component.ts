import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-customer-adress-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './customer-adress-modal.component.html',
  styleUrl: './customer-adress-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAdressModalComponent {
isFormValid: any;
closeModal() {
throw new Error('Method not implemented.');
}
}
