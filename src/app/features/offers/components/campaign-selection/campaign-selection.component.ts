import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-campaign-selection',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './campaign-selection.component.html',
  styleUrl: './campaign-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignSelectionComponent { }
