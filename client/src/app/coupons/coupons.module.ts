import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CouponsRoutingModule } from './coupons-routing.module';
import { CouponComponent } from './coupons.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CustomLoader } from '../custom-loader';
import { CouponService } from "./coupon.service";
import { AddEditCouponComponent } from "./add-edit-coupon/add-edit-coupon.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [
		CommonModule,
		CouponsRoutingModule,
		NgbModule,
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
		SharedModule
	],
	exports: [],
	declarations: [
		CouponComponent,
		AddEditCouponComponent
	],
	providers: [CouponService],
})
export class CouponsModule {
}
