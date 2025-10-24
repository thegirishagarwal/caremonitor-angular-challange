import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

export function ApiInterceptors(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);

  let APIURL = `${environment.API_BASE_URL}${req.url}`;
  req = req.clone({
		url: `${APIURL}`
	});
  return next(req);
}
