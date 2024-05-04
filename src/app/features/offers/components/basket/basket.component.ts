import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent { }
