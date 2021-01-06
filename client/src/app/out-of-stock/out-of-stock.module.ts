import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OutOfStockComponent } from './out-of-stock.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-ui-switch';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomLoader } from '../custom-loader';
import { OutOfStockService } from "./out-of-stock.service";
import { OutOfStockRoutingModule } from './out-of-stock-routing.module';
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [
		CommonModule,
		OutOfStockRoutingModule,
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
		SharedModule
	],
	declarations: [OutOfStockComponent],
	providers: [OutOfStockService],
	exports: []
})
export class OutOfStockModule {

}
