import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetCatalogResponse } from '../../../customers/models/catalog/get-catalog-response';
import { Router } from '@angular/router';
import { CatalogApiService } from '../../../customers/services/catalogApi.service';
import { GetCatalogProductOfferResponse } from '../../../customers/models/catalog/catalog-product-offer/get-catalog-product-offer-response';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalog-selection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './catalog-selection.component.html',
  styleUrl: './catalog-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSelectionComponent implements OnInit {
products = [
    { prodOfferId: 1, prodOfferName: 'Ürün 1', price: 100 },
    { prodOfferId: 2, prodOfferName: 'Ürün 2', price: 150 },
    { prodOfferId: 3, prodOfferName: 'Ürün 3', price: 200 },
    { prodOfferId: 4, prodOfferName: 'Ürün 4', price: 250 },
    { prodOfferId: 5, prodOfferName: 'Ürün 4', price: 250 },
    { prodOfferId: 6, prodOfferName: 'Ürün 4', price: 250 },
    { prodOfferId: 7, prodOfferName: 'Ürün 4', price: 250 },
    { prodOfferId: 8, prodOfferName: 'Ürün 4', price: 250 },
    { prodOfferId: 9, prodOfferName: 'Ürün 4', price: 250 },
  ];

  catalogList: GetCatalogResponse[] = [];
  productOfferList: GetCatalogProductOfferResponse[] = [];
  catalogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catalogApiService: CatalogApiService,
    private cdr: ChangeDetectorRef
  ){
    this.catalogForm = this.fb.group({
      catalog: [''],
      prodOfferId: [''],
      prodOfferName: ['']
    });
  }

  ngOnInit(): void {
    this.getCatalog();
  }

  getCatalog(): void {
    this.catalogApiService.getCatalogList().subscribe({
      next: (response) => {
        this.catalogList = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error, "error");
      }
    })
  }

  onCatalogChange(): void {
    this.searchOffers();
  }

  searchOffers(): void {
    const catalogId = this.catalogForm.get('catalog')?.value;
    const prodOfferId = this.catalogForm.get('prodOfferId')?.value;
    const prodOfferName = this.catalogForm.get('prodOfferName')?.value;

    if (catalogId || prodOfferId || prodOfferName) {
      const id = catalogId || '';

      this.catalogApiService.getCatalogProductOfferList(id).subscribe({
        next: (response) => {
          this.productOfferList = response.filter(offer =>
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
      this.productOfferList = [];
    }
  }


}
