import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';
import { SocketSharedService } from '../../SocketShare.service';
import { LanguagesModel } from '../../settings/languages/create-language/create-language.component';
import { SettingService } from "../../settings/setting.service";
import { ToastEnum, UtilService } from "../../../service/util.service";
import { NotificationService } from "../../notification-list/notification.service";
import { NotificationListModel } from "../../notification-list/notification-list.component";
import { CrudService } from 'service/crud.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
	// currentLang = 'en';
	public selectedLanguage: '';
	toggleClass = 'ft-maximize';
	placement = 'bottom-right';
	public isCollapsed = true;
	@Output()
	toggleHideSidebar = new EventEmitter<Object>();

	public config: any = {};
	public newOrdersList: Array<NotificationListModel> = [];
	public unreadTotal = 0;
	public logo: any = '../../../assets/img/gallery/pietech-logo.png';
	public languages: Array<LanguagesModel> = [];           // contains list of available languages
	public defaultLang: string = null;          // contains defauly language to be shown

	constructor(public translate: TranslateService,
		private router: Router, private utilService: UtilService, public settingsService: SettingService,
		private layoutService: LayoutService,
		private socketService: SocketSharedService,
		private configService: ConfigService,
		private crud: CrudService,
		private translateService: TranslateService,
		private notificationService: NotificationService
	) {
		if (sessionStorage.getItem('languageList')) {
			this.languages = JSON.parse(atob(sessionStorage.getItem('languageList')));
			this.languages.forEach(lang => {
				if (lang.isDefault === 1) {
					this.defaultLang = lang.languageCode;
				}
			});
		}
		if (!this.defaultLang) {
			this.defaultLang = 'nil';
		}
		this.getNotificationList();
		this.setLang();

		this.notificationService.getNotificationEvent().subscribe(() => {
			this.getNotificationList();
		});
	}

	// get's notifications
	private getNotificationList(): void {
		this.notificationService.getLatestNotification().subscribe((res: any) => {
			this.newOrdersList = res.response_data || [];
			this.unreadTotal = res.unread || 0;
		});
	}

	public viewOrder(notify) {
		this.notificationService.readNotification(notify._id).subscribe(() => {
			this.getNotificationList();
		});
		this.router.navigate(["/orders/view-order/", notify.orderId]);
	}

	public showAll() {
		this.router.navigate(["/notification-list"]);
	}

	ngOnInit() {
		this.config = this.configService.templateConf;
		this.crud.languagedelete$.subscribe(status => {
			if (status) {
				this.settingsService.getLanguageListDefault().subscribe((res: any) => {
					if (res.response_code === 200) {
						const languages: Array<LanguagesModel> = res.response_data;
						languages.forEach(lang => {
							if (lang.isDefault) {
								sessionStorage.setItem('language', lang.languageCode);
								this.languages = JSON.parse(atob(sessionStorage.getItem('languageList')));
								this.languages.forEach(lang => {
									if (lang.isDefault === 1) {
										this.defaultLang = lang.languageCode;
									}
								});
								this.translateService.use(lang.languageCode);
								this.translateService.setDefaultLang(lang.languageCode);
							}
						});
						sessionStorage.setItem('languageList', btoa(JSON.stringify(res.response_data)));
						this.languages = JSON.parse(atob(sessionStorage.getItem('languageList')));
						this.languages.forEach(lang => {
							if (lang.isDefault === 1) {
								this.defaultLang = lang.languageCode;
							}
						});
					}
				});
			}
		})
	}


	ngAfterViewInit() {
		if (this.config.layout.dir) {
			const dir = this.config.layout.dir;
			if (dir === 'rtl') {
				this.placement = 'bottom-left';
			} else if (dir === 'ltr') {
				this.placement = 'bottom-right';
			}
		}
	}

	// sets order as read and removed from the list
	public readOrder(index: number, _id: string, orderId: string): void {
		const body = {
			id: _id
		};
		// this.socketService.emitNotification(body);
		this.newOrdersList.splice(index, 1);
		this.router.navigate(['vieworder/', orderId]);
	}

	// plays bell notification sound when a new order is received
	private playAudio(): void {
		const audio = new Audio('assets/bell.mp3');
		audio.play();
	}

	// closes admin's session and logs him out of the system
	public signOut(): void {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('login');
		this.utilService.showToast('LOGOUT_SUCCESS', 'SUCCESS', ToastEnum.SUCCESS);
		this.router.navigate(['/login']);
	}

	// toggles sidebar
	public toggleSidebar(): void {
		const appSidebar = document.getElementsByClassName('app-sidebar')[0];
		if (appSidebar.classList.contains('hide-sidebar')) {
			this.toggleHideSidebar.emit(false);
		} else {
			this.toggleHideSidebar.emit(true);
		}
	}

	// called when admin changes the language
	public setLang(): void {
		sessionStorage.setItem('language', this.defaultLang);
		this.translate.use(this.defaultLang);
	}
}
