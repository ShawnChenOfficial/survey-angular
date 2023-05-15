import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'auth';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { ToastService } from 'src/app/project/toast/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
    // private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    if (this.authService.$isLoggedin) {
      // this.router.navigate(['/admin/management']);
    }
  }

  tryLogin() {
    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/management']);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.show('Login Failed', error, ToastEventType.Error);
      },
    });
  }
}
