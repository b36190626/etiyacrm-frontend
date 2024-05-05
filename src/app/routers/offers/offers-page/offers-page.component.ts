import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [
    CommonModule,HeaderComponent, RouterModule
  ],
  templateUrl: './offers-page.component.html',
  styleUrl: './offers-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersPageComponent { }
