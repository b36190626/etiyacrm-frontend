import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CreateCustomerPageComponent } from '../../../routers/customers/create-customer-page/create-customer-page.component';

@Component({
  selector: 'app-create-customer-layout',
  standalone: true,
  imports: [
    CommonModule, HeaderComponent, CreateCustomerPageComponent
  ],
  templateUrl: './create-customer-layout.component.html',
  styleUrl: './create-customer-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCustomerLayoutComponent { }


