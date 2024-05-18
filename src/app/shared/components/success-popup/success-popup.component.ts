import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SuccessMessageService } from '../../../features/customers/services/successMessage.service';
import { Subscription } from 'rxjs';

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
export class SuccessPopupComponent implements OnChanges {
  @Input() successMessage: string | null = null;
  isOpen: boolean = false;
  private subscription: Subscription;

  constructor(
    private successMessageService: SuccessMessageService,
    private cdr: ChangeDetectorRef
  ) {}

  visible: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['successMessage'] && this.successMessage) {
      this.showMessage();
    }
  }

  showMessage(): void {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 5000);
  }

  closeModal() {
    this.isOpen = false;
    this.cdr.markForCheck();
  }
}
