import { Component } from '@angular/core';
import { FuncServicesService } from 'src/app/services/func-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private functionsS:FuncServicesService){}

  
  
  public addToggle(){
    this.functionsS.addToggle(); 
  }
}
