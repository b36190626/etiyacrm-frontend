import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetCampaignResponse } from '../../../customers/models/catalog/get-campaign-response';
import { Router } from '@angular/router';
import { CatalogApiService } from '../../../customers/services/catalogApi.service';
import { GetCampaignProductOfferResponse } from '../../../customers/models/catalog/campaign-product-offer/get-campaign-product-offer-response';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaign-selection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './campaign-selection.component.html',
  styleUrl: './campaign-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignSelectionComponent implements OnInit {
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

  campaignList: GetCampaignResponse[] = [];
  campaignProductOfferList: GetCampaignProductOfferResponse[] = [];
  campaignForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catalogApiService: CatalogApiService,
    private cdr: ChangeDetectorRef
  ){
    this.campaignForm = this.fb.group({
      campaign: [''],
      prodOfferId: [''],
      prodOfferName: ['']
    });
  }

  ngOnInit(): void {
    this.getCampaign();
  }

  getCampaign(){
    this.catalogApiService.getCampaignList().subscribe({
      next: (response) => {
        this.campaignList = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error, "error");
      }
    })
  }

  onCampaignChange(): void {
    this.searchOffers();
  }

  searchOffers(): void {
    const campaignId = this.campaignForm.get('campaign')?.value;
    const prodOfferId = this.campaignForm.get('prodOfferId')?.value ;
    const prodOfferName = this.campaignForm.get('prodOfferName')?.value;


    if ( campaignId || prodOfferId || prodOfferName) {
      const id = campaignId || '';


      this.catalogApiService.getCampaignProductOfferList(id).subscribe({
        next: (response) => {
          this.campaignProductOfferList = response.filter(offer =>
            (!prodOfferId || offer.productOfferId.includes(prodOfferId)) &&
            (!prodOfferName || offer.productOfferName.includes(prodOfferName))
          );
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error, 'error');
        }
      });
    } else {
      this.campaignProductOfferList = [];
    }
  }
}

