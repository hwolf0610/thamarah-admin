import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './categories.component';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CustomLoader } from '../custom-loader';
import { CategoryService } from "./category.service";
import { AddEditCategoryComponent } from "./add-edit-category/add-edit-category.component";
import { ViewCategoryComponent } from "./view-category/view-category.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [
		CommonModule,
		CategoriesRoutingModule,
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
		SharedModule
	],
	exports: [],
	declarations: [
		CategoryComponent,
		AddEditCategoryComponent,
		ViewCategoryComponent
	],
	providers: [CategoryService],
})
export class CategoriesModule {
}
