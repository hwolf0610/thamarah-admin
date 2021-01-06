import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutOfStockComponent } from './out-of-stock.component';
import { ViewProductComponent } from '../products/view-product/view-product.component';

const routes: Routes = [
	{
		path: '',
		component: OutOfStockComponent,
		data: {
			title: 'Out-Of-Stock'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OutOfStockRoutingModule {
}
