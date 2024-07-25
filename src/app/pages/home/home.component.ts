import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticateService } from '../../authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private auth: AuthenticateService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/authentication/login']);
    this._snackBar.open('Logged out successfully', 'Close', {
      duration: 2000,
    });
  }
}
