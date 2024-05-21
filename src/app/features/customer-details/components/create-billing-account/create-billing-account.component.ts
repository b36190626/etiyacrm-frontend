import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressInfoComponent } from '../../../customers/components/address-info/address-info.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { CustomerInfoAddressFormComponent } from '../customer-info-address-form/customer-info-address-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-billing-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddressInfoComponent,
    HeaderComponent,
    CustomerInfoAddressFormComponent
  ],
  templateUrl: './create-billing-account.component.html',
  styleUrl: './create-billing-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBillingAccountComponent implements OnInit {
  accountform: FormGroup;
  pathId: string | null = null;
  isFormValid = false;
  @Input() addresList;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.activatedRoute.parent.params.subscribe(params => {
      this.pathId = params['id'];
    })
  }

  createForm() {
    this.accountform = this.fb.group({
      accountName: ['', [Validators.required,]],
      description: ['', Validators.required],
      address: [''], //yok
    });
    this.accountform.statusChanges.subscribe((status) => {
      this.isFormValid = status === 'VALID';
    });
  }

  onCancel(){
    this.router.navigate(['home/customer/', this.pathId, 'account'])
  }

}
