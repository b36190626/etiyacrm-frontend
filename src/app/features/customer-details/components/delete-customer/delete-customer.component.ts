import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmExitComponent } from '../../../../shared/components/confirm-exit/confirm-exit.component';
import { SuccessPopupComponent } from '../../../../shared/components/success-popup/success-popup.component';
import { CustomerApiService } from '../../../customers/services/customerApi.service';
import { MessageService } from '../../../customers/services/message.service';

@Component({
  selector: 'app-delete-customer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ConfirmExitComponent,
    SuccessPopupComponent
  ],
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCustomerComponent implements OnInit {
  customerId: string | null = null;
  showConfirmation: boolean = false;
  @ViewChild(ConfirmExitComponent) confirmExitComponent: ConfirmExitComponent;

  constructor(
    private customerApiService: CustomerApiService,
    private change: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {this.onDelete();}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.customerId = params.get('id');
      console.log("customerId", this.customerId);
    })
  }

  deleteCustomer() {
    this.customerApiService.deleteCustomer(this.customerId).subscribe(
      {
        next: (response) => {
          console.log('Customer deleted successfully', response);
          this.messageService.setmessage('Customer deleted successfully.');
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);
        },
        error: (error) => {
          console.error('Error', error);
        },
        complete: () => {
          this.router.navigate(['/home']);
          this.showConfirmation = false;
        }
      }
    );
  }

  onDelete() {
    this.showConfirmation = true;
    console.log("onDelete called");
  }

  onConfirmDelete(): void {
    if (this.customerId) {
      this.deleteCustomer();
    }
    this.showConfirmation = false;
  }

  onCloseConfirmation() {
    this.showConfirmation = false;
  }
}
