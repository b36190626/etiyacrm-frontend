import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-popup',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './success-popup.component.html',
  styleUrl: './success-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessPopupComponent {
  @Input() message: unknown;
  isOpen: boolean = true;

  closeModal(){
    this.isOpen = false;
  }
}
