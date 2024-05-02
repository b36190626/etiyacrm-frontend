import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlErrorMessagePipe } from '../../../app/core/pipes/control-error-message.pipe';

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


  isOpen: boolean = true
  openModal(){
    this.isOpen = true;
  }
  closeModal(){
    this.isOpen = false;
  }
}
