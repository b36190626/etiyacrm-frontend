
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import "@fontsource/exo"; // Defaults to weight 400
import "@fontsource/exo/600.css"; // Specify weight
import "@fontsource/exo/900.css";
import { SingleFocusLayoutComponent } from '../../../../shared/components/single-focus-layout/single-focus-layout.component';
import { LoginFormComponent } from '../../../features/auth/components/login-form/login-form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule, SingleFocusLayoutComponent, LoginFormComponent, TranslateModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {

}
