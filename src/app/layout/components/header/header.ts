import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Auth, SnackbarService } from '@core/services';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  router = inject(Router);
  private readonly authService = inject(Auth);
  private readonly _snackBar = inject(SnackbarService);

  logout() {
    this.authService.logout();
    this._snackBar.open({
      message: 'Logout successful',
      action: 'Close'
    });
    this.router.navigate(['/login']);
  }
}
