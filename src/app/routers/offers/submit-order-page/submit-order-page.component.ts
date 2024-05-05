import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-submit-order-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './submit-order-page.component.html',
  styleUrl: './submit-order-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitOrderPageComponent {
  products: any = {
    orderId: 398545,
    orderItems: [{id:1111, name: "4GB kotalı"}, {id: 22222, name:"Müşteri Modemi PR"}],
    serviceAddress: 'Ankara/Çankaya',
    totalAmount: 150.52
  }
}
