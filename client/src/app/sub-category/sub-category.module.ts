import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubCategoryComponent } from './sub-category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-ui-switch';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomLoader } from '../custom-loader';
import { SubCategoryService } from "./sub-category.service";
import { CategoryService } from "../categories/category.service";
import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { AddEditSubCategoryComponent } from './add-edit-subcategory/add-edit-subcategory.component';
import { SharedModule } from "../shared/shared.module";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
	imports: [
		CommonModule,
		SubCategoryRoutingModule,
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
		NgbModalModule,
		SharedModule,
		NgSelectModule
	],
	declarations: [SubCategoryComponent, AddEditSubCategoryComponent],
	providers: [SubCategoryService, CategoryService],
	exports: []
})
export class SubCategoryModule {

}
