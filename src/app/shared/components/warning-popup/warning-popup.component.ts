import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlErrorMessagePipe } from '../../../core/pipes/control-error-message.pipe';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../features/customers/services/message.service';

@Component({
  selector: 'app-warning-popup',
  standalone: true,
  imports: [
    CommonModule, ControlErrorMessagePipe
  ],
  templateUrl: './warning-popup.component.html',
  styleUrls: ['./warning-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningPopupComponent implements OnChanges, OnInit, OnDestroy {
  @Input() message: unknown;
  isOpen: boolean = true;
  private subscription: Subscription;
  private timeoutId: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.subscription = this.messageService.message$.subscribe(message => {
      this.message = message;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message']) {
      this.startTimer(10000);
    }
  }

  closeModal() {
    this.isOpen = false;
    this.cdr.detectChanges();
  }

  startTimer(count: number) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.isOpen = true;
    this.cdr.detectChanges();
    this.timeoutId = setTimeout(() => {
      this.isOpen = false;
      this.cdr.detectChanges();
    }, count);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
