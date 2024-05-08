import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UpdateContactMediumRequest } from '../../../customers/models/contact-medium/requests/update-contact-medium-request';
import { ContactMediumApiService } from '../../../customers/services/contactMediumApi.service';

@Component({
  selector: 'app-contact-medium-info-update-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './contact-medium-info-update-form.component.html',
  styleUrl: './contact-medium-info-update-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMediumInfoUpdateFormComponent implements OnInit {
  contactMediumInfoUpdateForm!: FormGroup ;
  isFormValid: boolean = false;
  pathId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactMediumApiService: ContactMediumApiService,
    private fb: FormBuilder,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(params =>{
      this.pathId = params['id'];
    }).unsubscribe();

    this.contactMediumInfoUpdateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      homePhone: [''],
      mobilePhone: ['', Validators.required],
      fax: ['']
    });
    this.contactMediumInfoUpdateForm.statusChanges.subscribe(status => {
      this.isFormValid = status === 'VALID';
    })

  }
  updateContactMedium(){
    const request: UpdateContactMediumRequest = {
      customerId: this.pathId,
      email: this.contactMediumInfoUpdateForm.value.email,
      homePhone: this.contactMediumInfoUpdateForm.value.homePhone,
      mobilePhone: this.contactMediumInfoUpdateForm.value.mobilePhone,
      fax: this.contactMediumInfoUpdateForm.value.fax,
    };
    this.contactMediumApiService.putContactMedium(this.pathId, request).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('Error', error)
      },
      complete: () => {
        this.contactMediumInfoUpdateForm.reset();
        this.router.navigate(['/home/customer/', this.pathId , 'contact-medium-info'])
      }
    })
  }

  onSubmit() {
    if (this.contactMediumInfoUpdateForm.valid) {
      this.isFormValid = true;
      this.updateContactMedium();
    } else {
      this.isFormValid = false;
    }
  }
}
