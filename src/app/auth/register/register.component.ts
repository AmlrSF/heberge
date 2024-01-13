import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public signupForm!: FormGroup;

  constructor(private fb: FormBuilder,private router : Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  navigateToRegister() {
    this.router.navigate(['/Login']);
  }

  public onSubmit() {
    // Implement your form submission logic here
    // You can access form values using this.signupForm.value
    console.log('Form submitted:', this.signupForm.value);
  }
}
