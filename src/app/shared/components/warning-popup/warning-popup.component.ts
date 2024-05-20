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
  styleUrl: './warning-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningPopupComponent implements OnChanges, OnInit, OnDestroy {
@Input() message: unknown;
isOpen: boolean = true;
private subscription: Subscription;

constructor(
  private cdr: ChangeDetectorRef,
  private messageService: MessageService
) {}


ngOnInit() {
  this.subscription = this.messageService.message$.subscribe(message => {
    this.message = message;
    if (message) {
      this.isOpen = true; // Show the success message component
      setTimeout(() => {
        this.messageService.clearmessage();
        this.isOpen = false; // Hide the success message component after 3 seconds
        this.cdr.detectChanges(); // Trigger change detection
      }, 3000);
    }
  });
}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message']) {
        this.cdr.detectChanges();
    }
  }
  closeModal(){
    this.isOpen = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
