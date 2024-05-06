import { CustomerApiService } from './../../../customers/services/customerApi.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerDetailsDto } from '../../../customers/models/customer-details-dto';
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

// ngOnInit(): void {
//   this.getCustomerInfo();
//   console.log("çalıştı")
// }
// getCustomerInfo(){
//   this.activatedRoute.params.subscribe((params =>{
//     this.customerId = params['customerId'];
//   })).unsubscribe();
//       this.customerApiService.getById(this.customerId).subscribe({
//       next: (customerDetails) => {
//         this.customerInfo = customerDetails;
//       },
//       complete: () => {
//         this.change.markForCheck();
//       }
//     })
// }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.customerId = params['id'];
      console.log(this.customerId,"customerId")

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
