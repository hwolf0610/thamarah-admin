import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DealRoutingModule } from './deals-routing.module';
import { DealComponent } from './deals.component';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomLoader } from '../custom-loader';
import { DealService } from "./deals.service";
import { CategoryService } from "../categories/category.service";
import { ProductService } from "../products/products.service";
import { AddEditDealComponent } from "./add-edit-deal/add-edit-deal.component";
import { ViewDealComponent } from "./view-deal/view-deal.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [
		CommonModule,
		DealRoutingModule,
		NgbModule,
		FormsModule,
		UiSwitchModule,
		NgxPaginationModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useClass: CustomLoader,
				deps: [HttpClient]
			}
		}),
		NgbTooltipModule,
		NgSelectModule,
		SharedModule
	],
	exports: [],
	declarations: [
		DealComponent,
		AddEditDealComponent,
		ViewDealComponent
	],
	providers: [DealService, CategoryService, ProductService],
})
export class DealsModule {
}
