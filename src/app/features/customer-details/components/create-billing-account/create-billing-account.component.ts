import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-billing-account',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './create-billing-account.component.html',
  styleUrl: './create-billing-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBillingAccountComponent { }
