import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth, SnackbarService } from '@core/services';
import { Router } from '@angular/router';
import { FormHelperMethods } from '@core/classes/form-helper';
import { IconsPipe } from '@shared/pipes';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    IconsPipe
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login extends FormHelperMethods {

  private readonly _authService = inject(Auth);
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _snackBar = inject(SnackbarService);

  loginForm!: FormGroup;
  isPasswordVisible = signal(false);

  ngOnInit(): void {
    this._initLoginForm();
  }

  _initLoginForm(): void {
    const controlConfig: Record<string, any> = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    };
    this.loginForm = this._fb.group(controlConfig);
    this.setFormGroup(this.loginForm);
  }

  onSubmit() {
    this.isFormSubmitted.set(true);
    if (this.loginForm.invalid) {
      return;
    }
    const {email, password} = this.loginForm.value;
    const res: any = this._authService.login(email, password);
    if (res.status === 'failure') {
      this._snackBar.open({
        message: res.error,
        action: 'Close',
        type: 'error'
      });
      return;
    }
    this._snackBar.open({
      message: 'Login successful',
      action: 'Close'
    });
    this._router.navigate(['/dashboard']);
  }

  changePasswordType() {
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }
}
