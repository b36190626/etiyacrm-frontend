import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-billing-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrl: './billing-layout.component.scss'
})
export class BillingLayoutComponent {}
