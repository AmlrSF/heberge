import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { FuncServicesService } from 'src/app/services/func-services.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
    
  constructor(
    public functionsS: FuncServicesService,
    public auth : AuthUserService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.auth.profile().subscribe((res)=>{
      this.router.navigate(["/Login"])     
    })
  }

  getContentStyles() {
    return this.functionsS.status ? { 'width': 'calc(100% - 60px)', 'left': '60px' } : {};
  }

}
