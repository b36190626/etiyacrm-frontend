import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private successMessageService: SuccessMessageService) {
    this.subscription = this.successMessageService.successMessage$.subscribe(message => {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = null;
      }, 5000);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeModal(){
    this.isOpen = false;
  }
}
