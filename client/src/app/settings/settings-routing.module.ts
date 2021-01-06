import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkingHourComponent } from './working-hours/working-hours.component';
import { ChatComponent } from './chat/chat.component';
import { DeliveryTaxComponent } from './delivey&Tax/delivery-tax.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { BusinessInfoComponent } from './business-info/business-info.component';
import { CurrencyComponent } from './currency/currency.component';
import { LanguagesComponent } from './languages/languages.component';
import { CreateLanguageComponent } from './languages/create-language/create-language.component';
import { AboutUsComponent } from "./about-us/about-us.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { TermsConditionsComponent } from "./terms-conditions/terms-conditions.component";


const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'working-hours',
				component: WorkingHourComponent,
				data: {
					title: 'Working Hours'
				}
			},
			{
				path: 'chat',
				component: ChatComponent,
				data: {
					title: 'Chat'
				}
			},
			{
				path: 'delivery-settings',
				component: DeliveryTaxComponent,
				data: {
					title: 'Delivery & Tax settings'
				}
			},
			{
				path: 'profile',
				component: MyProfileComponent,
				data: {
					title: 'My Profile'
				}
			},


			{
				path: 'currency',
				component: CurrencyComponent,
				data: {
					title: 'Currency & Languages'
				}
			},
			{
				path: 'languages',
				component: LanguagesComponent
			},
			{
				path: 'add-language',
				component: CreateLanguageComponent
			},
			{
				path: 'edit-language/:id',
				component: CreateLanguageComponent
			},
			{
				path: 'business-info',
				component: BusinessInfoComponent,
				data: {
					title: 'Business-Info'
				}
			},
			{
				path: 'about-us',
				component: AboutUsComponent
			},
			{
				path: 'privacy-policy',
				component: PrivacyPolicyComponent
			},
			{
				path: 'terms-and-conditions',
				component: TermsConditionsComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SettingsRoutingModule {
}
