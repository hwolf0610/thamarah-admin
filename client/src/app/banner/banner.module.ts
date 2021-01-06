import { BannerComponent } from './banner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomLoader } from '../custom-loader';
import { BannerService } from "./banner.service";
import { CategoryService } from "../categories/category.service";
import { ProductService } from "../products/products.service";
import { AddEditBannerComponent } from "./add-edit-banner/add-edit-banner.component";
import { SharedModule } from "../shared/shared.module";
import { BannerRoutingModule } from "./banner-routing.module";

@NgModule({
	imports: [
		CommonModule, 
		FormsModule, 
		NgbModule, 
		NgSelectModule, 
		NgxPaginationModule,
		FileUploadModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useClass: CustomLoader,
				deps: [HttpClient]
			}
		}),
		BannerRoutingModule,
		SharedModule
	],
	declarations: [BannerComponent, AddEditBannerComponent],
	providers: [BannerService, CategoryService, ProductService],
	exports: []
})

export class BannerModule {

}
