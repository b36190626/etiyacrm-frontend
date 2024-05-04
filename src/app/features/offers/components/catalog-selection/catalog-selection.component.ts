import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-catalog-selection',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './catalog-selection.component.html',
  styleUrl: './catalog-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSelectionComponent { }
