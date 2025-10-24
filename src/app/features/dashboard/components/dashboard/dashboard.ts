import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Auth } from '@core/services';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly authService = inject(Auth);
  user = this.authService.getLoggedInUser();
}
