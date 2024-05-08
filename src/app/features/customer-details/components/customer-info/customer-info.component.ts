import { CustomerApiService } from './../../../customers/services/customerApi.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerDetailsDto } from '../../../customers/models/customer/customer-details-dto';
import { SearchResultComponent } from '../../../customers/components/search-result/search-result.component';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
  ],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[SearchResultComponent]
})
export class CustomerInfoComponent implements OnInit{
@Input() id!: number;
customerId!: number;
customerInfo!: CustomerDetailsDto;

constructor(
  private customerApiService: CustomerApiService,
  private change: ChangeDetectorRef,
  private activatedRoute: ActivatedRoute
){}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(params => {
      this.customerId = params['id'];
      console.log(this.customerId,"customerId")
      console.log(params)

    }).unsubscribe();
    this.getCustomerInfo();
  }

  getCustomerInfo(){
    this.customerApiService.getById(this.customerId).subscribe({
      next: (customerDetails) => {
        this.customerInfo = customerDetails;
        console.log(customerDetails)
      },
      complete: () => {
        this.change.markForCheck();
      }
    })
  }

}
