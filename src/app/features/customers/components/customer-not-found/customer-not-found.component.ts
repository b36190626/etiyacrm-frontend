import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-not-found',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink
  ],
  templateUrl: './customer-not-found.component.html',
  styleUrl: './customer-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerNotFoundComponent { }
