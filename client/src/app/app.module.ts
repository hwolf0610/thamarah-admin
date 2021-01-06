import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import {
	PerfectScrollbarModule,
	PERFECT_SCROLLBAR_CONFIG,
	PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { SocketSharedService } from './SocketShare.service';
import { CustomLoader } from './custom-loader';
import { environment } from '../environments/environment';
import { HttpInterceptorService } from './http-interceptor.service';
import { LanguagesModel } from './settings/languages/create-language/create-language.component';
import { CrudService } from '../service/crud.service';
import { HttpModule } from '@angular/http';
import { StoreModule } from "@ngrx/store";
import { chatReducer } from "./chat-store/chat.reducer";
import { OrderService } from "./orders/order.service";
import { ProductService } from "./products/products.service";


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true,
	wheelPropagation: false
};

export function getLanguageList(http: HttpClient, translateService: TranslateService) {
	return () => {
		return http.get(`${environment.API_ENDPOINT}/languages/list`).toPromise().then((data: any) => {
			if (data.response_code === 200) {
				const languages: Array<LanguagesModel> = data.response_data;
				languages.forEach(lang => {
					if (lang.isDefault) {
						sessionStorage.setItem('language', lang.languageCode);
						translateService.use(lang.languageCode);
						translateService.setDefaultLang(lang.languageCode);
					}
				});
				sessionStorage.setItem('languageList', btoa(JSON.stringify(data.response_data)));
			}
		});
	}
}


@NgModule({
	declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent],
	imports: [
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot(),

		// FormsModule,
		// ReactiveFormsModule,
		HttpClientModule,
		HttpModule,
		NgbModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useClass: CustomLoader,
				deps: [HttpClient, CrudService]
			}
		}),
		PerfectScrollbarModule,
		StoreModule.forRoot({ 'chatState': chatReducer })
	],
	providers: [
		AuthGuard,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
		SocketSharedService,
		{
			provide: APP_INITIALIZER,
			useFactory: getLanguageList,
			multi: true,
			deps: [HttpClient, TranslateService]
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true
		},
		OrderService,
		ProductService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor() {

	}
}
