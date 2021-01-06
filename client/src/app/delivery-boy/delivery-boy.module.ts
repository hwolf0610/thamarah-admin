import { NgModule } from '@angular/core';
import { DeliveryBoyComponent } from './delivery-boy.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CustomLoader } from '../custom-loader';
import { DeliveryBoyService } from "./delivery-boy.service";
import { AddEditDeliveryBoyComponent } from './add-edit-delivery-boy/add-edit-delivery-boy.component';
import { DeliveryBoyRoutingModule } from "./delivery-boy-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		NgxPaginationModule,
		UiSwitchModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useClass: CustomLoader,
				deps: [HttpClient]
			}
		}),
		DeliveryBoyRoutingModule,
        SharedModule
	],
	declarations: [DeliveryBoyComponent, AddEditDeliveryBoyComponent],
	providers: [DeliveryBoyService],
	exports: []
})
export class DeliveryBoyModule {

}
