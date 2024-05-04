import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
@Component({
  selector: 'etiya-login-form',
  standalone: true,
  imports: [
    CommonModule, RouterModule, TranslateModule, WarningPopupComponent, SelectButtonModule, ControlErrorMessagePipe
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  showPassword: boolean = false;
  showPopup: boolean = false;
  form: FormGroup = this.fb.group({
    username: [],
    password: [
      '',
      [
        Validators.minLength(8),
      ]
    ]
  })


  constructor(
    private fb: FormBuilder,
    private router: Router,
  ){}


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  togglePopup(event: Event) {
    event?.preventDefault();
    this.showPopup = !this.showPopup;
  }

}


