import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartistModule } from 'ng-chartist';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from '../shared/directives/match-height.directive';
import { OrderRoutingModule } from './orders-routing.module';
import { OrderComponent } from './orders.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CustomLoader } from '../custom-loader';
import { OrderService } from "./order.service";
import { DeliveryBoyService } from "../delivery-boy/delivery-boy.service";
import { SettingService } from "../settings/setting.service";
import { SharedModule } from "../shared/shared.module";
import { ViewOrderComponent } from "./view-order/view-order.component";

@NgModule({
	imports: [
		CommonModule,
		OrderRoutingModule,
		NgbModule,
		ChartistModule,
		MatchHeightModule,
		FormsModule,
		NgxPaginationModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useClass: CustomLoader,
				deps: [HttpClient]
			}
		}),
        SharedModule,
		NgbDatepickerModule
	],
	exports: [],
	declarations: [
		OrderComponent,
		ViewOrderComponent
	],
	providers: [OrderService, DeliveryBoyService, SettingService],
})
export class OrdersModule {
}
