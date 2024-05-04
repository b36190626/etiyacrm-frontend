import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-campaign-selection',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './campaign-selection.component.html',
  styleUrl: './campaign-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignSelectionComponent {
  products = [
    {campaignId:1,campaignName:'test', prodOfferId: 1, prodOfferName: 'Ürün 1'},
    {campaignId:1, campaignName:'test',prodOfferId: 2, prodOfferName: 'Ürün 2' },
    {campaignId:1, campaignName:'test',prodOfferId: 3, prodOfferName: 'Ürün 3' },
    { campaignId:1,campaignName:'test',prodOfferId: 4, prodOfferName: 'Ürün 4' },
    {campaignId:1, campaignName:'test',prodOfferId: 5, prodOfferName: 'Ürün 4' },
    { campaignId:1,campaignName:'test',prodOfferId: 6, prodOfferName: 'Ürün 4' },
    {campaignId:1, campaignName:'test',prodOfferId: 7, prodOfferName: 'Ürün 4' },
    {campaignId:1, campaignName:'test',prodOfferId: 8, prodOfferName: 'Ürün 4' },
    {campaignId:1, campaignName:'test',prodOfferId: 9, prodOfferName: 'Ürün 4' },
  ];
}
