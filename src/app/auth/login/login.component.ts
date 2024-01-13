import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  navigateToRegister() {
    this.router.navigate(['/Register']);
  }

  onSubmit() {
    // Implement your form submission logic here
    // You can access form values using this.loginForm.value
    console.log('Form submitted:', this.loginForm.value);
  }
}
