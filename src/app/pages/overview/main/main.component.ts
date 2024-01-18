import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public domains: any[] = [];
  public clients: any[] = [];
  public chart: any;
  public data: any[] = [];
  public profit: number = 0;

  private apiUrl: string = "http://localhost:3000/api/v1/clients";
  private baseUrl = 'http://localhost:3000/api/v1/domains';

  constructor(
    private router: Router, private clientS: ClientsService, private http: HttpClient
  ) { }




  ngOnInit(): void {
    this.getClients();
    this.getDomains();



    this.calculateProfit();
  }

  public calculateProfit() {
    if (this.domains.length > 0) {


    }
  }




  public getDomains() {
    this.http.get(this.baseUrl).subscribe(
      (res: any) => {
        console.log(res);
        this.domains = res.data;
        this.profit = this.domains.map((item: any) => {
          console.log(item);

          return item.buyingPrice - item.purchasePrice;
        }).reduce((prev, item) => prev + item);

      },
      (error: any) => {
        console.error('Error fetching domains:', error);
      }
    );
  }

  public getClients() {
    this.http.get(this.apiUrl).subscribe(
      (clients: any) => {
        this.clients = clients.clients;
      },
      (error: any) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
  
}
