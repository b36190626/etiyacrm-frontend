import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { BasketComponent } from '../../../features/offers/components/basket/basket.component';
import { CatalogSelectionComponent } from '../../../features/offers/components/catalog-selection/catalog-selection.component';
import { CampaignSelectionComponent } from '../../../features/offers/components/campaign-selection/campaign-selection.component';

@Component({
  selector: 'app-offer-selection-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterLink,
    BasketComponent,
    CatalogSelectionComponent,
    CampaignSelectionComponent
  ],
  templateUrl: './offer-selection-page.component.html',
  styleUrl: './offer-selection-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferSelectionPageComponent {
  selectedTab: string = 'catalog';
  constructor(private router: Router){}

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

}
