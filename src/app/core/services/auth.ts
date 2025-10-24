import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const user = {
  email: 'test@caremonitor.com',
  password: 'pass@123'
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly _cookieService = inject(CookieService);

  login(email: string, password: string) {
    if(email !== user.email || password !== user.password) {
      return {
        status: 'failure',
        error: 'Your email or password is incorrect'
      }
    }
    const stringToken = JSON.stringify({
      email,
      password
    });
    const token = window.btoa(stringToken);
    this._cookieService.set('token', token);
    return {
      status: 'success',
      token,
      user: {
        email
      }
    };
  }

  logout() {
    this._cookieService.delete('token');
    return true;
  }

  getLoggedInUser() {
    const token = this._cookieService.get('token');
    if(!token) {
      return null;
    }
    const stringToken = window.atob(token);
    const user = JSON.parse(stringToken);
    return user;
  }

}
