import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';

@Component({
  selector: 'app-customer-not-found',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    WarningPopupComponent
  ],
  templateUrl: './customer-not-found.component.html',
  styleUrl: './customer-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerNotFoundComponent {
  message: string = 'Matching credentials not found.';
}
