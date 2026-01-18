import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  private readonly API = 'http://localhost:8080/api/auth/login';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.error = '';

    this.http.post<any>(this.API, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.authService.login(res);
        this.router.navigate(['/articulos']);
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }
}
