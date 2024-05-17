import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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
@Input() message: string = '';

  constructor(
    private router: Router,
  ){}


  cancel(pathId: string) {
    this.router.navigate(['/home/customer/', pathId, 'info']);
  }

  delete(){
    //this.router.navigate(['/home']);
  }
}
