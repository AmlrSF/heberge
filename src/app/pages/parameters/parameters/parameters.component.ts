import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public addDbForm !:FormGroup;
  public addFtpForm !:FormGroup;



  private id: string = "";
  public domains: any[] = [];
  public filtereddomains: any[] = [];
  public client: any[] = [];

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
    this.clientS.getAllClients().subscribe((res: any) => {
      this.client = res.clients;
    })

    this.addDomain = this.fb.group({
      client: ['', Validators.required],
      purchasePrice: ['', Validators.required],
      buyingPrice: ['', Validators.required],
      status: [false, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      domainName: ['', Validators.required],
      hostOvhOffer: ['', Validators.required],
      domain: [false, Validators.required], // boolean value
      hosting: [false, Validators.required], // boolean value
      mail: [false, Validators.required], // boolean value
    });
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


  viewDomain(domain: any): void {
    //code


    console.log('View domain:', domain);

    // Assuming 'id' is a property in your domain object
    const domainId = domain._id;

    // Navigate to the domain details page with the domain ID
    this.router.navigate(['/admin/domains/domain', domainId]);


  }

  public closeDbModal() {
    document.getElementById('addDbModal')?.classList.add('hidden');
  }
  
  public closeFtpModal() {
    document.getElementById('addFtpModal')?.classList.add('hidden');
  }

  // Function to edit a Domain
  editDomain(domain: any): void {
    // Assuming you have a form group for editing (editdomainForm)
    this.addDomain.patchValue({
      client: domain.client._id,
      purchasePrice: domain.purchasePrice,
      buyingPrice: domain.buyingPrice,
      status: domain.status,
      startDate: this.formatDate(domain.startDate),
      endDate: this.formatDate(domain.endDate),
      domainName: domain.domainName,
      hostOvhOffer: domain.hostOvhOffer,
      domain: domain.domain, // boolean value
      hosting: domain.hosting, // boolean value
      mail: domain.mail, // boolean value
    });

    this.id = domain._id;

    // Show the modal
    document.getElementById('editUserModal')?.classList.remove('hidden');
  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    // Format the date as a string in "YYYY-MM-DD" format
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  submitForm() {
    if (this.addDomain.valid) {

      const formData = { ...this.addDomain.value }; // Convert FormGroup to a plain object

      // Send formData to the server
      this.http.put(`${this.baseUrl}/Domain/${this.id}`, formData).subscribe(
        (res: any) => {
          if (res.success) {
            this.getDomains();
            this.closeModel();
          }
        }
      );

    } else {
      console.log("not valid");

    }
  }

  public closeModel() {
    document.getElementById('editUserModal')?.classList.add('hidden');
  }

  // Function to delete a domain
  deleteDomain(domain: any): void {
    this.domainS.deleteDomain(domain._id).subscribe((res: any) => {
      console.log(res);
      this.getDomains();
    })
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

  public addDb(domain : any){
    document.getElementById('addDbModal')?.classList.remove('hidden');
  }

  public addFtp(domain:any){
    document.getElementById('addFtpModal')?.classList.remove('hidden');
  }

  submitDbForm() {
    if (this.addDbForm.valid) {
      const formData = { ...this.addDbForm.value };
  
      
      // Close the modal
      this.closeDbModal();
    } else {
      console.log("Database form is not valid");
    }
  }
  
  submitFtpForm() {
    if (this.addFtpForm.valid) {
      const formData = { ...this.addFtpForm.value };
  
    
      // Close the modal
      this.closeFtpModal();
    } else {
      console.log("FTP form is not valid");
    }
  }

}
