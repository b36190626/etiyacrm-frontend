import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WarningPopupComponent } from '../../../../../shared/components/warning-popup/warning-popup.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [
    CommonModule,FormsModule, WarningPopupComponent
  ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent {
  isAnyInputFilled: boolean = false;
  form: FormGroup = this.fb.group({
    id:[],
    customerId:[],
    accoundNumber:[],
    gsmNumber:[],
    firstname:[],
    lastname:[],
    orderNumber:[],
  })
  constructor(
    private fb: FormBuilder,
  ){}

  onInputChange(){
    this.isAnyInputFilled = Object.values(this.form.value).some(val => val !== null);
  }


}
