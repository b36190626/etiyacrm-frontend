import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class SuccessPopupComponent implements OnInit, OnDestroy {
  @Input() successMessage: string | null = null;
  isOpen: boolean = true;
  private subscription: Subscription;

  constructor(
    private successMessageService: SuccessMessageService,
    private cdr: ChangeDetectorRef
  ) {
    this.subscription = this.successMessageService.successMessage$.subscribe(message => {
      this.successMessage = message;
      this.cdr.markForCheck();
      setTimeout(() => {
        this.successMessage = null;
        this.cdr.markForCheck();
      }, 5000);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeModal() {
    this.isOpen = false;
    this.cdr.markForCheck();
  }
}
