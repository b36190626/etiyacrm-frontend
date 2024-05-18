import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }



// @Input() message: string = '';

//   constructor(
//     private router: Router,
//   ){}


//   cancel(pathId: string) {
//     this.router.navigate(['/home/customer/', pathId, 'info']);
//   }

//   delete(){
//     //this.router.navigate(['/home']);
//   }
}
