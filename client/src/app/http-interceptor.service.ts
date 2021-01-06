import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpHeaders,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ToastEnum, UtilService } from "../service/util.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
	constructor(private utilsService: UtilService) {
	}

	intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
		let headers = {
			'Content-Type': 'application/json',
			'language': sessionStorage.getItem('language') || 'en'
		};
		if (sessionStorage.getItem('token')) {
			const token = atob(atob(atob(sessionStorage.getItem('token'))));
			headers['Authorization'] = 'Bearer ' + token;
		}
		request = request.clone({setHeaders: headers});
		return handler.handle(request).pipe(
			catchError(error => {
				if (error instanceof HttpErrorResponse) {
					switch (error.status) {
						case 400:
							error.error.errors.forEach(message => {
								this.utilsService.showToast(message, '', ToastEnum.ERROR, true);
							});
							return throwError(error);
						case 404:
							this.utilsService.showToast(error.error.message || 'API Not found', '', ToastEnum.ERROR, true);
							return throwError(error);
					}
				}
				return of(error);
			})
		);
	}
}
