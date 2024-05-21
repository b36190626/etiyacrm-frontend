import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { AddressInfoComponent } from '../../../customers/components/address-info/address-info.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../customers/services/message.service';
import { BillingAccountApiService } from '../../../customers/services/billingAccountApi.service';
import { UpdateBillingAccountRequest } from '../../../customers/models/billing-account/requests/update-billing-account-request';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';

@Component({
  selector: 'app-update-billing-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    NavbarComponent,
    AddressInfoComponent,
    WarningPopupComponent,
    ControlErrorMessagePipe
  ],
  templateUrl: './update-billing-account.component.html',
  styleUrl: './update-billing-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBillingAccountComponent implements OnInit {
  accountUpdateForm!: FormGroup;
  isFormValid: boolean = false;
  pathId!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private billingAccountApiService: BillingAccountApiService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.pathId = params['id'];
      console.log('pathID:', this.pathId);
      this.getAccountInfo();
    }).unsubscribe();

    this.accountUpdateForm = this.fb.group({
      accountName: ['', [Validators.required,]],
      description: ['', Validators.required],
      address: [''], //yok
    });
    this.accountUpdateForm.statusChanges.subscribe((status) => {
      this.isFormValid = status === 'VALID';
    });
  }


  getAccountInfo(){
    this.billingAccountApiService.getById(this.pathId).subscribe({
      next: (accountDetails) => {
        this.accountUpdateForm.patchValue({
          //burada veriler çekilecek
        });
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching customer details', error);
      },
    });
  }

  updateBillingAccount() {
    const request: UpdateBillingAccountRequest = {
      name: this.accountUpdateForm.value.accountName,
      description: this.accountUpdateForm.value.description,
      customerId: this.pathId,
      addressId: this.accountUpdateForm.value.addressId,//addressId yok, buraya address id gelecek hata verdiği için yazdım
    };
    this.cdr.detectChanges();
    this.billingAccountApiService.putBillingAccount(this.pathId, request).subscribe({
      next: () => {
        //başarı için mesaj
      },
      error: (error) => {
        console.error('Error', error);
      },
      complete: () => {
        this.accountUpdateForm.reset();
        this.router.navigate(['/home/customer/', this.pathId, 'account']);
      },
    });
  }

  onSubmit() {
    if (this.accountUpdateForm.valid) {
      console.log('Form Submitted!', this.accountUpdateForm.value);
      this.updateBillingAccount();
    }
  }

  onCancel() {
    this.router.navigate(['/home/customer/', this.pathId, 'account']);
  }
}
