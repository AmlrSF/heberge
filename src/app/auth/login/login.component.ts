import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;
  private apiUrl = 'http://localhost:3000/api/v1/customers/login';

  constructor(private auth:AuthUserService,private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  navigateToRegister() {
    this.router.navigate(['/Register']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // If the form is valid, proceed with HTTP POST request
      const loginData = this.loginForm.value;

      // Make HTTP POST request
      this.http.post(this.apiUrl, loginData).subscribe(
        (response: any) => {
          // Handle successful response
          console.log('Login successful:', response);

          if (response.token && response.message == "Login successful") {

            this.auth.setToken(response.token)

            // Optionally, you can navigate to another page on success
            this.router.navigate(['/admin']);
          }
        },
        (error) => {
          // Handle error
          console.error('Error during login:', error);

          // Optionally, you can show an error message to the user
        }
      );
    } else {
      // Handle form validation errors
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
