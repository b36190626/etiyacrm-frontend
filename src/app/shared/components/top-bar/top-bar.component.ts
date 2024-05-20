import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink, RouterModule } from "@angular/router";
import { DeleteCustomerComponent } from "../../../features/customer-details/components/delete-customer/delete-customer.component";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    DeleteCustomerComponent
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent implements OnInit {
  pathId!: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.pathId = params['id'];
      console.log('pathID:', this.pathId);

      }).unsubscribe();

  }
}
