import { AddressResponseDto } from './../../../customers/models/address/address-response-dto';
import { AddressApiService } from './../../../customers/services/addressApi.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IdToNamePipe } from "../../../../core/pipes/idToName.pipe";
import { map, Observable, switchMap, catchError, of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-customer-info-address-form',
  standalone: true,
  templateUrl: './customer-info-address-form.component.html',
  styleUrls: ['./customer-info-address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    IdToNamePipe
  ]
})
export class CustomerInfoAddressFormComponent implements OnInit {
  customerId!: string;
  addressInfo!: AddressResponseDto[];
  addressDetails: Array<{ address: AddressResponseDto, cityName?: string, districtName?: string }> = [];

  constructor(
    private addressApiService: AddressApiService,
    private change: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(params => {
      this.customerId = params['id'];
      this.getAddress();
    });
  }


  // city idsine göre city name çek
  getCityName(districtId: string): Observable<string> {
    return this.addressApiService.getDistrictById(districtId).pipe(
      switchMap(district => this.addressApiService.getCityById(district.cityId)),
      map(city => city.name),

      catchError(error => {
        console.error('Error fetching city name', error);
        return of('Unknown City');
      })
    );
  }

  // districtIdye göre district name çek
  getDistrictName(districtId: string): Observable<string> {
    return this.addressApiService.getDistrictById(districtId).pipe(
      map(district => district.name),

      catchError(error => {
        console.error('Error fetching district name', error);
        return of('Unknown District');
      })
    );
  }


  getAddress() {
    this.addressApiService.getById(this.customerId).subscribe({
      next: (addressDetails) => {
        this.addressInfo = addressDetails;  // address detailsi kaydet.
        this.addressInfo.forEach(address => {
          // city ve district nameleri sync şekilde al
          forkJoin({
            cityName: this.getCityName(address.districtId),
            districtName: this.getDistrictName(address.districtId)
          }).subscribe(({ cityName, districtName }) => {
            // addressdetails fieldlarını arraye al
            this.addressDetails.push({ address, cityName, districtName });

            this.change.markForCheck(); // LAĞNET OLSUN SANA LAĞNETT!
          });
        });
      },
      error: (error) => {
        console.error('Error fetching address info', error);
      }
    });
  }
}
