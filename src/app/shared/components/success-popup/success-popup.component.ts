import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SuccessMessageService } from '../../../features/customers/services/successMessage.service';

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
export class SuccessPopupComponent implements OnInit, OnDestroy  {
  @Input() successMessage: string | null = null;
  isOpen: boolean = false;
  visible: boolean = false;
  private subscription: Subscription;

  constructor(
    private cdr: ChangeDetectorRef,
    private successMessageService: SuccessMessageService
  ) {}

  ngOnInit() {
    this.subscription = this.successMessageService.successMessage$.subscribe(message => {
      this.successMessage = message;
      if (message) {
        this.isOpen = true; // Show the success message component
        setTimeout(() => {
          this.successMessageService.clearSuccessMessage();
          this.isOpen = false; // Hide the success message component after 3 seconds
          this.cdr.detectChanges(); // Trigger change detection
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
