import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('authToken');

    // Ajouter le jeton uniquement si disponible
    if (token) {
      // Cloner la requête pour ajouter le jeton dans les en-têtes
      const cloned = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
      // Passer la requête clonée avec les en-têtes d'autorisation
      return next.handle(cloned);
    } else {
      // Passer la requête sans modification
      return next.handle(request);
    }
  }
}
