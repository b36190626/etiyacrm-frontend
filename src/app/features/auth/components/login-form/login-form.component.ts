import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { WarningPopupComponent } from '../../../../../shared/components/warning-popup/warning-popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'etiya-login-form',
  standalone: true,
  imports: [
    CommonModule, RouterModule, TranslateModule, WarningPopupComponent, SelectButtonModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {

  form: FormGroup = this.fb.group({
    password: [
      '',
      [
        Validators.minLength(8),
      ]
    ]
  })

  showPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ){}



  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  showPopup: boolean = false;

  togglePopup(event: Event) {
    event?.preventDefault();
    this.showPopup = !this.showPopup;
  }

}


