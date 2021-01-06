import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SocketSharedService } from './SocketShare.service';
import { CrudService } from '../service/crud.service';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from "./orders/order.service";
import { ProductService } from "./products/products.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
	subscription: Subscription;
	public exportRequestInterval;
	public productExportRequestInterval;

	constructor(
		private router: Router,
		private socketService: SocketSharedService,
		private crud: CrudService,
		private translateService: TranslateService,
		private orderService: OrderService,
		private productsService: ProductService
	) {
		if (!sessionStorage.getItem('token') && !sessionStorage.getItem('login')) {
			const languageCode = sessionStorage.getItem('language');
			this.translateService.use(languageCode || 'en');
			this.translateService.setDefaultLang(languageCode || 'en');
		}
	}

	// calls the method every 10 seconds to get order exported data
	private getOrderExportUrl(): void {
		this.exportRequestInterval = setInterval(() => {
			this.orderService.checkExportStatus().subscribe((res: any) => {
				if (res.response_code === 200) {
					if (res.response_data.exportedFile.status === 'Completed') {
						const publicId = res.response_data.exportedFile.publicId;
						window.open(res.response_data.exportedFile.url, 'blank');
						this.clearExportRequestInterval();
						setTimeout(() => {
							this.orderService.deleteExportFile(publicId).subscribe((reS: any) => {
								if (reS.response_code === 200) {
									console.log('FILE DELETED');
								}
							}, error => {
								console.log('FILE NOT DELETED');
							});
						}, 5000);
					}
				}
			}, error => {
				console.log('API ERROR');
			});
		}, 5000);
	}

	// clears interval
	private clearExportRequestInterval(): void {
		if (this.exportRequestInterval) {
			clearInterval(this.exportRequestInterval);
			this.crud.setOrderExportRequest(false);
		}
	}

	// calls the method every 10 seconds to get order exported data
	private getProductExportUrl(): void {
		this.productExportRequestInterval = setInterval(() => {
			this.productsService.checkExportStatus().subscribe((res: any) => {
				if (res.response_code === 200) {
					if (res.response_data.productExportedFile.status === 'Completed') {
						const publicId = res.response_data.productExportedFile.publicId;
						window.open(res.response_data.productExportedFile.url, 'blank');
						this.clearProductExportInterval();
						setTimeout(() => {
							this.productsService.deleteExportedFile(publicId).subscribe((reS: any) => {
								if (reS.response_code === 200) {
									console.log('FILE DELETED');
								}
							}, error => {
								console.log('FILE NOT DELETED');
							});
						}, 5000);
					}
				}
			}, error => {
				console.log('API ERROR');
			});
		}, 10000);
	}

	// clears product export interval
	private clearProductExportInterval(): void {
		if (this.productExportRequestInterval) {
			clearInterval(this.productExportRequestInterval);
			this.crud.setProductExportRequest(false);
		}
	}

	ngOnInit() {
		this.translateService.onLangChange.subscribe(lang => {
			if (lang && lang.translations) {
				this.crud.languageJSON.next(lang.translations);
			}
		});
		this.crud.orderExport$.subscribe(status => {
			if (status) {
				this.getOrderExportUrl();
			} else {
				this.clearProductExportInterval();
			}
		});

		this.crud.productExport$.subscribe(status => {
			if (status) {
				this.getProductExportUrl();
			} else {
				this.clearExportRequestInterval();
			}
		});

		Notification.requestPermission().then(permission => {

		});
		if (sessionStorage.getItem('login')) {
			this.socketService.connectToSocketServer();
		}
		this.subscription = this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd)
			)
			.subscribe(() => window.scrollTo(0, 0));
	}


	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}


}
