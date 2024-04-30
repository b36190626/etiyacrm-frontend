import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { WarningPopupComponent } from '../../../../../shared/components/warning-popup/warning-popup.component';
@Component({
  selector: 'etiya-login-form',
  standalone: true,
  imports: [
    CommonModule, RouterModule, TranslateModule, WarningPopupComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  showPassword: boolean = false;

  constructor(

  ){}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  showPopup: boolean = false;

  togglePopup(event: Event) {
    event?.preventDefault();
    this.showPopup = !this.showPopup;}
}

