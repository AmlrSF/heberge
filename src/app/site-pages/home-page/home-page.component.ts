import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  private baseUrm = "https://sandbox.paymee.tn/api/v2/payments/create";

  private formData = {
    "amount": 220.25,
    "note": "Order #123",
    "first_name": "John",
    "last_name": "Doe",
    "email": "test@paymee.tn",
    "phone": "+21611222333",
    "return_url": "https://www.return_url.tn",
    "cancel_url": "https://www.cancel_url.tn",
    "webhook_url": "https://www.webhook_url.tn",
    "order_id": "244557"
  }

  private apiKey = 'e430b12a45aa846ebc21395a35d43956cae176a1';  // Replace with your actual API key

  // Set up the headers with the authorization token
  private headers = new HttpHeaders({
    'Authorization': `Token ${this.apiKey}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  public create() {
    this.http.post(this.baseUrm, this.formData, { headers: this.headers }).subscribe(
      (res: any) => {
        console.log(res);

        // Check if the response status is true
        if (res.status === true) {
          // Redirect the user to the payment URL
          window.location.href = res.data.payment_url;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
