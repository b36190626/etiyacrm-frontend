import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-confirm-exit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './confirm-exit.component.html',
  styleUrl: './confirm-exit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmExitComponent {
  @Input() message: string;
  @Output() confirm = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<void>();
  //@ViewChild('confirmModal') confirmModalRef: ElementRef;
  showModal: boolean = true;

  openModal() {
    this.showModal = true;

  }
  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

}
