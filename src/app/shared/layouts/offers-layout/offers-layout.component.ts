import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { OffersPageComponent } from '../../../routers/offers/offers-page/offers-page.component';

@Component({
  selector: 'app-offers-layout',
  standalone: true,
  imports: [
    CommonModule,HeaderComponent,OffersPageComponent
  ],
  templateUrl: './offers-layout.component.html',
  styleUrl: './offers-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersLayoutComponent { }
