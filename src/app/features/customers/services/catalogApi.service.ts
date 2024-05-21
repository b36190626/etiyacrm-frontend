import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetProductOfferResponse } from '../models/catalog/productOffer/responses/get-product-offer-response';
import { GetCatalogResponse } from '../models/catalog/get-catalog-response';
import { GetCampaignResponse } from '../models/catalog/get-campaign-response';
import { GetCatalogProductOfferResponse } from '../models/catalog/catalog-product-offer/get-catalog-product-offer-response';
import { GetCampaignProductOfferResponse } from '../models/catalog/campaign-product-offer/get-campaign-product-offer-response';

@Injectable({
  providedIn: 'root'
})
export class CatalogApiService {

  constructor(private http: HttpClient) { }

  getProductList(): Observable<GetProductOfferResponse> {
    return this.http.get<GetProductOfferResponse>
    ('http://localhost:8001/catalog-service/api/v1/product-offers')
  }


  getCatalogList(): Observable<GetCatalogResponse[]> {
    return this.http.get<GetCatalogResponse[]>
    ('http://localhost:8001/catalog-service/api/v1/catalogs')
  }

  getCatalogProductOfferList(catalogId: string): Observable<GetCatalogProductOfferResponse[]> {
    return this.http.get<GetCatalogProductOfferResponse[]>
    (`http://localhost:8001/catalog-service/api/v1/catalog-product-offers/${catalogId}`);
  }

  getCampaignList(): Observable<GetCampaignResponse[]> {
    return this.http.get<GetCampaignResponse[]>
    ('http://localhost:8001/catalog-service/api/v1/campaigns')
  }

  getCampaignProductOfferList(campaignId: string): Observable<GetCampaignProductOfferResponse[]> {
    return this.http.get<GetCampaignProductOfferResponse[]>(`http://localhost:8001/catalog-service/api/v1/campaigns_product_offers/${campaignId}`);
  }


}
