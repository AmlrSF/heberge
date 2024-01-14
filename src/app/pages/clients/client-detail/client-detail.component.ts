import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  public client: any;

  constructor(private clients: ClientsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the client ID from the route parameters
    const clientId = this.route.snapshot.paramMap.get('id');

    // Check if clientId is available
    if (clientId) {
      // Call the service to get client details by ID
      this.clients.getClientById(clientId).subscribe(
        (res: any) => {
          this.client = res; // Assign client details to the component property
          console.log(this.client);
          
        },
        (error: any) => {
          console.error('Error fetching client details:', error);
        }
      );
    } else {
      console.error('Client ID not found in route parameters.');
    }
  }
}
