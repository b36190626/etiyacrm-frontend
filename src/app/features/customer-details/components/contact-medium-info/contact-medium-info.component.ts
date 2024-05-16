import { GetContactMediumRequestDto } from './../../../customers/models/contact-medium/requests/get-contact-medium-request';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactMediumApiService } from '../../../customers/services/contactMediumApi.service';
@Component({
  selector: 'app-contact-medium-info',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './contact-medium-info.component.html',
  styleUrl: './contact-medium-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMediumInfoComponent implements OnInit{
  customerId!: string;
  contactMediumInfo!: GetContactMediumRequestDto;
  pathId!: string;
  constructor(
    private contactMediumApiService: ContactMediumApiService,
    private change: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(params => {
      this.customerId = params['id'];
      this.contactMediumApiService.setCustomerId(this.customerId);
    });

    this.getContactMedium();
  }
  onClick(){
    this.router.navigate
    (['/home/customer', this.contactMediumInfo.id,'contact-medium-info-update'], {state:{customerId: this.customerId}})
  }

  getContactMedium(){
    this.contactMediumApiService.getById(this.customerId).subscribe({
        next: (contactMediumDetails) => {
        this.contactMediumInfo = contactMediumDetails;
      },
      complete: () => {
        this.change.markForCheck();
      }
    })
  }

}
