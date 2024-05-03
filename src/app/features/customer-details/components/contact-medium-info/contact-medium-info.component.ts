import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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
export class ContactMediumInfoComponent {
  email: string = 'example@example.com';
  homePhone: string = '123-456-7890';
  mobilePhone: string = '987-654-3210';
  fax: string = '555-555-5555';

}
