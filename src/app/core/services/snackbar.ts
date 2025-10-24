import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface SnackbarData {
  message: string;
  action?: string;
  duration?: number;
  horizontalPosition?: 'left' | 'center' | 'right';
  verticalPosition?: 'top' | 'bottom';
  type?: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private readonly _snackBar = inject(MatSnackBar);

  open(data: SnackbarData) {
    const {
      message,
      action,
      duration,
      horizontalPosition,
      verticalPosition,
      type = 'success'
    }: SnackbarData = data;
    this._snackBar.open(message || 'Something went wrong', action || 'Close', {
      duration: duration || 2000,
      horizontalPosition: horizontalPosition || 'right',
      verticalPosition: verticalPosition || 'top',
      panelClass: `${type}-snackbar`
    });
  }
}
