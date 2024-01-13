import { Component } from '@angular/core';
import { FuncServicesService } from 'src/app/services/func-services.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
    
  constructor(
    public functionsS: FuncServicesService,

  ) {}
  getContentStyles() {
    return this.functionsS.status ? { 'width': 'calc(100% - 60px)', 'left': '60px' } : {};
  }

}
