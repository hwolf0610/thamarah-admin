import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner.component';
import { AddEditBannerComponent } from "./add-edit-banner/add-edit-banner.component";

const routes: Routes = [
	{
		path: '',
		component: BannerComponent,
		data: {
			title: 'Banners'
		}
	},
	{
		path: 'add-banner',
		component: AddEditBannerComponent,
		data: {
			title: 'Add Banner'
		}
	},
	{
		path: 'edit-banner/:id',
		component: AddEditBannerComponent,
		data: {
			title: 'Edit Banner'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BannerRoutingModule {
}
