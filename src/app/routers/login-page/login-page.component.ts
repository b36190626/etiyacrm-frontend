import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import "@fontsource/exo"; // Defaults to weight 400
import "@fontsource/exo/600.css"; // Specify weight

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent { }
