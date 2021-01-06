import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from '../shared/directives/match-height.directive';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CustomLoader } from '../custom-loader';
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [
		CommonModule,
		UsersRoutingModule,
		NgbModule,
		ChartistModule,
		MatchHeightModule,
		FormsModule,
		NgxPaginationModule,
		UiSwitchModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useClass: CustomLoader,
				deps: [HttpClient]
			}
		}),
		UiSwitchModule,
		SharedModule
	],
	exports: [],
	declarations: [
		UsersComponent
	],
	providers: [],
})
export class UsersModule {
}
