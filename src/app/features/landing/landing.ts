import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';import { Router } from '@angular/router';



@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,      // 👈 CLAVE
    MatButtonModule
  ],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class LandingComponent {

  constructor(private router: Router) {}

  goLogin(): void {
    console.log('CLICK ADELANTE');
    this.router.navigate(['/login']);
  }
}

