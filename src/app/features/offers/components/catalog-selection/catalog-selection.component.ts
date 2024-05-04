import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-catalog-selection',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './catalog-selection.component.html',
  styleUrl: './catalog-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSelectionComponent {
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
}
