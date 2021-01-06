import { NgModule } from '@angular/core';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CommonModule } from '@angular/common';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from '../shared/directives/match-height.directive';
import { SettingsRoutingModule } from './settings-routing.module';
import { WorkingHourComponent } from './working-hours/working-hours.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { DeliveryTaxComponent } from './delivey&Tax/delivery-tax.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MomentModule } from 'ngx-moment';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BusinessInfoComponent } from './business-info/business-info.component';
import { CurrencyComponent } from './currency/currency.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LanguagesComponent } from './languages/languages.component';
import { CreateLanguageComponent } from './languages/create-language/create-language.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CustomLoader } from '../custom-loader';
import { NgSelectModule } from "@ng-select/ng-select";
import { SettingService } from "./setting.service";
import { UserService } from "../users/user.service";
import { AboutUsComponent } from "./about-us/about-us.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { TermsConditionsComponent } from "./terms-conditions/terms-conditions.component";
import { QuillModule } from "ngx-quill";
import { SharedModule } from "../shared/shared.module";


@NgModule({
	imports: [
		CommonModule,
		SettingsRoutingModule,
		UiSwitchModule,
		ChartistModule,
		NgbModule,
		MatchHeightModule,
		NgxPaginationModule,
		FormsModule,
		MomentModule,
		SharedModule,
		PerfectScrollbarModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useClass: CustomLoader,
				deps: [HttpClient]
			}
		}),
		MonacoEditorModule.forRoot(),
		NgSelectModule,
		QuillModule.forRoot()
	],
	exports: [],
	declarations: [
		WorkingHourComponent,
		ChatComponent,
		DeliveryTaxComponent,
		MyProfileComponent,
		BusinessInfoComponent,
		CurrencyComponent,
		LanguagesComponent,
		CreateLanguageComponent,
		AboutUsComponent,
		PrivacyPolicyComponent,
		TermsConditionsComponent
	],
	providers: [SettingService, UserService],
})
export class SettingsModule {
}
