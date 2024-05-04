import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
currentRoute!: string
isActive: boolean = true;

  constructor(
    private router: Router,
    private change: ChangeDetectorRef,
  ){}
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.currentRoute = event.urlAfterRedirects;
        this.change.markForCheck();
      }
    });
  }

  isB2CActive(): boolean{
    return this.currentRoute.includes("/home/search")
  }


  b2cClick(){
    this.router.navigate(["/home/search"]);
    console.log(this.currentRoute);
  }
}
