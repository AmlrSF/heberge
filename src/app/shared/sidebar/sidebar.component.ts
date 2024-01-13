import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FuncServicesService } from 'src/app/services/func-services.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public currentPath: string | undefined;



  constructor(
    public functionsS: FuncServicesService,
    private router: Router
  ) {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {

        this.currentPath = event.url.slice(1);

      }
    });

  }

  
  public navigateTo(item: string) {

    this.router.navigate([item]);

  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }
}
