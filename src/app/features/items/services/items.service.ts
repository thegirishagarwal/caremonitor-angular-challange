import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ROUTES_CONFIG } from '@core/routes';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly http = inject(HttpClient);

  getAllItems() {
    const API_URL = ROUTES_CONFIG.ITEMS;
    return this.http.get(API_URL);
  }
}
