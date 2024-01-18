import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { DomainsService } from 'src/app/services/domain/domain.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
  private baseUrl = 'http://localhost:3000/api/v1/domains';
  public addDomain !: FormGroup;
  private id: string = "";
  public domains: any[] = [];
  public filtereddomains: any[] = [];

  constructor(
    private clientS: ClientsService,
    private domainS: DomainsService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {

  } 

  ngOnInit(): void {
    this.getDomains();
  }
 
  

  getDomains(): void {
    this.http.get(this.baseUrl).subscribe(
      (res: any) => {
        console.log(res);
  
        this.domains = res.data; // Assuming res is an array of domains
  
        // Filter domains based on domain and status properties
        this.domains = this.domains.filter((domain) => domain.domain && domain.status);
        console.log(this.domains);
        
        this.filtereddomains = [...this.domains];
        // console.log('domains:', this.domains);
      },
      (error: any) => {
        console.error('Error fetching domains:', error);
      }
    );
  }
  

  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }


  viewDomain(Domain: any): void {
    //code
  }

  // Function to edit a Domain
  editDomain(Domain: any): void {
    //code
  }


  // Function to delete a Domain
  deleteDomain(Domain: any): void {
    //code
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    console.log(filterValue);

    this.filtereddomains = this.domains.filter(domain =>
      domain.client.name.toLowerCase().includes(filterValue) ||
      domain.domainName.toLowerCase().includes(filterValue) ||
      domain.hostOvhOffer.toLowerCase().includes(filterValue) ||
      this.formatReadableDate(domain.startDate).toLowerCase().includes(filterValue) ||
      this.formatReadableDate(domain.endDate).toLowerCase().includes(filterValue) ||
      domain.purchasePrice.toString().includes(filterValue) ||
      domain.buyingPrice.toString().includes(filterValue)
    );
  }

}
