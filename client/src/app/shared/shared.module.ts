import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
//COMPONENTS
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarDirective } from './directives/sidebar.directive';
import { SidebarLinkDirective } from './directives/sidebarlink.directive';
import { SidebarListDirective } from './directives/sidebarlist.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebaranchortoggle.directive';
import { SidebarToggleDirective } from './directives/sidebartoggle.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingService } from "../settings/setting.service";
import { NotificationService } from "../notification-list/notification.service";
import { CustomLoaderComponent } from "./custom-loader/custom-loader.component";

@NgModule({
	exports: [
		CommonModule,
		FooterComponent,
		NavbarComponent,
		SidebarComponent,
		NotificationSidebarComponent,
		ToggleFullscreenDirective,
		SidebarDirective,
		NgbModule,
		TranslateModule,
		CustomLoaderComponent
	],
	imports: [
		RouterModule,
		CommonModule,
		NgbModule,
		TranslateModule,
		PerfectScrollbarModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		CustomLoaderComponent,
		FooterComponent,
		NavbarComponent,
		SidebarComponent,
		NotificationSidebarComponent,
		ToggleFullscreenDirective,
		SidebarDirective,
		SidebarLinkDirective,
		SidebarListDirective,
		SidebarAnchorToggleDirective,
		SidebarToggleDirective
	],
	providers: [SettingService, NotificationService]
})
export class SharedModule {
}
