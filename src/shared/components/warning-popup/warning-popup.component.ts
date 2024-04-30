import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-warning-popup',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './warning-popup.component.html',
  styleUrl: './warning-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningPopupComponent {
  isOpen: boolean = true

  openModal(){
    this.isOpen = true;
  }

  closeModal(){
    this.isOpen = false;
  }
}
