import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'etiya-login-form',
  standalone: true,
  imports: [
    CommonModule, RouterModule, TranslateModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
