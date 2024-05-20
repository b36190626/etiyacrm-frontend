import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { CustomerApiService } from './../../services/customerApi.service';
import { AddressApiService } from '../../services/addressApi.service';
import { ContactMediumApiService } from './../../services/contactMediumApi.service';

import { CreateContactMediumRequest } from '../../models/contact-medium/requests/create-contact-medium-request';
import { selectIndividualCustomer } from '../../../../shared/stores/customers/individual-customer.selector';
import { selectAddress } from '../../../../shared/stores/addresses/address.selector';
import { selectContactMedium } from '../../../../shared/stores/contact-medium/contact-medium.selector';

import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';
import { NoStringInputDirective } from '../../../../core/directives/no-string-input.directive';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
import { MessageService } from '../../services/message.service';
import { setContactMedium } from '../../../../shared/stores/contact-medium/contact-medium.action';

@Component({
  selector: 'app-contact-medium',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlErrorMessagePipe,
    NoStringInputDirective,
    NgxMaskDirective,
    WarningPopupComponent,
  ],
  templateUrl: './contact-medium.component.html',
  styleUrls: ['./contact-medium.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMediumComponent implements OnInit {
  contactForm!: FormGroup;
  isFormValid = false;
  routerCustomerId: string;

  constructor(
    private fb: FormBuilder,
    private customerApiService: CustomerApiService,
    private addressApiService: AddressApiService,
    private contactMediumApiService: ContactMediumApiService,
    private router: Router,
    private store: Store,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.createForm();
    this.subscribeToContactMediumState();
    this.trackFormStatusChanges();
  }

  createForm() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      homePhone: [''],
      mobilePhone: ['', Validators.required],
      fax: ['']
    });
  }

  subscribeToContactMediumState() {
    this.store.pipe(select(selectContactMedium)).subscribe(contactMedium => {
      this.contactForm.patchValue(contactMedium);
      console.log('contactMediumState:', contactMedium);
    });
  }

  trackFormStatusChanges() {
    this.contactForm.statusChanges.subscribe(status => {
      this.isFormValid = status === 'VALID';
    });
  }

  saveToDatabase() {
    forkJoin({
      customer: this.store.pipe(select(selectIndividualCustomer), take(1)),
      addresses: this.store.pipe(select(selectAddress), take(1))
    }).pipe(
      switchMap(({ customer, addresses }) => {
        console.log('Customerlar:', customer);
        console.log('Addressler:', addresses);

        return this.customerApiService.postCustomer(customer).pipe(
          switchMap(createdCustomerResponseMapCustomer => {
            const customerId = createdCustomerResponseMapCustomer.id;
            this.routerCustomerId = customerId;
            console.log("router customer id", this.routerCustomerId);
            if (!customerId) {
              throw new Error('Customer hatasi -> ID hala undefined');
            }

            console.log('Responsedan gelen Customer ID:', customerId);
            const validAddresses = addresses.filter(address => address.districtId && address.districtId.trim() !== ''); //filtrele trimle ama 0th indis verisini bana getirme. Validation Err.....

            const newAddresses = validAddresses.map(address => ({
              description: address.description || 'Default Description',
              street: address.street || 'Default Street',
              flatNumber: address.flatNumber || 0,
              districtId: address.districtId,
              customerId,
              defaultAddress: address.defaultAddress
            }));

            console.log('newaddresler BURADA', newAddresses);
            return forkJoin(newAddresses.map(address => this.addressApiService.postAddress(address))).pipe(
              switchMap(() => {
                const contactMedium: CreateContactMediumRequest = {
                  email: this.contactForm.value.email,
                  homePhone: this.contactForm.value.homePhone,
                  mobilePhone: this.contactForm.value.mobilePhone,
                  fax: this.contactForm.value.fax,
                  customerId
                };

                console.log('Contact-Medium verisi GELDİ?:', contactMedium);
                return this.contactMediumApiService.postContactMedium(contactMedium);
              }),
              catchError(error => {
                console.error('adddress eklenemedi ', error);
                console.error('Addressin son hali ', newAddresses);
                return of(null);
              })
            );
          }),
          catchError(error => {
            console.error('cu', error);
            return of(null);
          })
        );
      }),
      catchError(error => {
        console.error('....state gelmedi......', error);
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        this.messageService.setmessage('Customer created successfully');
        this.router.navigate(['/home/customer/',this.routerCustomerId,'info']);
       // this.router.navigate([`/home/customer/${this.routerCustomerId}/info`]);
      }
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);

      this.saveToDatabase();
      //this.router.navigate(['/home/customer/',this.routerCustomerId,'info']);
      //this.router.navigate([`/home/customer/${this.routerCustomerId}/info`]);
    }
  }

  onCancel() {
    const contactMedium: CreateContactMediumRequest = {
      email: this.contactForm.value.email,
      homePhone: this.contactForm.value.homePhone,
      mobilePhone: this.contactForm.value.mobilePhone,
      fax: this.contactForm.value.fax,
      customerId: ''
    };
    this.store.dispatch(setContactMedium({ contactMedium }));

    this.contactForm.reset();

    this.router.navigate(['/create-customer/address-info']);
  }
}
