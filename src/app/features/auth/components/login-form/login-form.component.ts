import { MessageService } from '../../../customers/services/message.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlErrorMessagePipe } from '../../../../core/pipes/control-error-message.pipe';
import { WarningPopupComponent } from '../../../../shared/components/warning-popup/warning-popup.component';
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
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  showPassword: boolean = false;
  showPopup: boolean = false;
  loginErrorMessage: string;

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
        Validators.maxLength(20),
      ]
    ],
    rememberMe: [false],
  })


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ){}
  ngOnInit() {
    this.form.valueChanges.subscribe(() => this.form.markAllAsTouched()); // Tek satırda tüm kontrol değişikliklerini dinler ve dokunulmuş olarak işaretler
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  togglePopup(event: Event) {
    event?.preventDefault();
    this.showPopup = !this.showPopup;
  }

  noCharacterValidator(control) {
    const turkishChars = /^[a-zA-Z][a-zA-Z]$/;
    if (turkishChars.test(control.value)) {
      return null;
    }
    return { 'loginCharacter': true };
  }

  onSubmit() {
    const dummyUsername = 'testuser';
    const dummyPassword = 'testpassword';

    const enteredUsername = this.form.get('username')?.value;
    const enteredPassword = this.form.get('password')?.value;
    const rememberMe = this.form.get('rememberMe')?.value;

    if (!enteredUsername || !enteredPassword) {
      this.loginErrorMessage = 'Username and password fields cannot be empty.';
      return;
    }

    if (enteredPassword.minLength){
      this.loginErrorMessage = 'Password cannot be less than 8 characters';
    }

    if (enteredUsername === dummyUsername && enteredPassword === dummyPassword) {
      console.log('Başarılı giriş!');
      this.messageService.setmessage('Logged in successfully');
      this.router.navigate(['/home']);

      if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify({ username: enteredUsername, password: enteredPassword }));
      } else {
        // "Remember me" seçeneği işaretli değilse, saklanmış herhangi bir kullanıcı bilgisini temizleyin.
        localStorage.removeItem('currentUser');
      }
    } else {
      this.loginErrorMessage = 'Wrong username or password. Please try again';
      console.log('Hatalı kullanıcı adı veya şifre!');
    }
  }

}


