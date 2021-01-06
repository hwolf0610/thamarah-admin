import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponComponent } from './coupons.component';
import { AddEditCouponComponent } from "./add-edit-coupon/add-edit-coupon.component";

const routes: Routes = [
	{
		path: '',
		component: CouponComponent,
		data: {
			title: 'Coupons'
		},
	},
	{
		path: 'add-coupon',
		component: AddEditCouponComponent,
		data: {
			title: 'Add coupon'
		},
	},
	{
		path: 'edit-coupon/:id',
		component: AddEditCouponComponent,
		data: {
			title: 'Edit coupon'
		},
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CouponsRoutingModule {
}
