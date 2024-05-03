import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DemographicFormComponent } from "../../../features/customers/components/demographic-form/demographic-form.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-create-customer-page',
    standalone: true,
    templateUrl: './create-customer-page.component.html',
    styleUrl: './create-customer-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule, ReactiveFormsModule,
        DemographicFormComponent, RouterModule
    ]
})
export class CreateCustomerPageComponent { }
