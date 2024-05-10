import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
import { NoTurkishCharacterDirective } from '../../../../core/directives/no-turkish-character.directive';
@Component({
  selector: 'etiya-login-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    WarningPopupComponent,
    SelectButtonModule,
    ControlErrorMessagePipe,
    NoTurkishCharacterDirective
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  showPassword: boolean = false;
  showPopup: boolean = false;
  usernameErrorMessage: string = '';
  passwordErrorMessage: string = '';

  form: FormGroup = this.fb.group({
    username: [
      '',
    [
      Validators.required,
      Validators.maxLength(20),
      this.noCharacterValidator
    ]],
    password: [
      '',
      [
        Validators.required,
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

  noCharacterValidator(control) {
    const turkishChars = /^[a-zA-Z][a-zA-Z]{3,20}$/;
    if (turkishChars.test(control.value)) {
      return null;
    }
    return { 'loginCharacter': true };
  }

  onSubmit() {
  }

}


