import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';
import { ControlErrorMessagePipe } from '../../../core/pipes/control-error-message.pipe';


@Component({
  selector: 'app-warning-popup',
  standalone: true,
  imports: [
    CommonModule, ControlErrorMessagePipe
  ],
  templateUrl: './warning-popup.component.html',
  styleUrl: './warning-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningPopupComponent {
@Input() message: unknown;

isOpen: boolean = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message']) {
      this.isOpen = true; // message değiştiğinde popup'ı tekrar aç
    }
  }

  closeModal(){
    this.isOpen = false;
  }
}
