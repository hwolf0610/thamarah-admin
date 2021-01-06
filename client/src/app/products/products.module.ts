import { NgModule } from '@angular/core';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CommonModule } from '@angular/common';
import { ChartistModule } from 'ng-chartist';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from '../shared/directives/match-height.directive';
import { ProductRoutingModule } from './products-routing.module';
import { ProductComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomLoader } from '../custom-loader';
import { NgSelectModule } from "@ng-select/ng-select";
import { ProductService } from "./products.service";
import { CategoryService } from "../categories/category.service";
import { SubCategoryService } from "../sub-category/sub-category.service";
import { AddEditProductComponent } from "./add-edit-product/add-edit-product.component";
import { ViewProductComponent } from "./view-product/view-product.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [
		CommonModule,
		ProductRoutingModule,
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
		NgSelectModule,
		NgbTooltipModule,
		SharedModule
	],
	exports: [],
	declarations: [
		ProductComponent,
		AddEditProductComponent,
		ViewProductComponent
	],
	providers: [ProductService, CategoryService, SubCategoryService],
})
export class ProductModule {
}
