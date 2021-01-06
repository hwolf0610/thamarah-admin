import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryBoyComponent } from './delivery-boy.component';
import { AddEditDeliveryBoyComponent } from "./add-edit-delivery-boy/add-edit-delivery-boy.component";

const routes: Routes = [
	{
		path: '',
		component: DeliveryBoyComponent,
		data: {
			title: 'Delivery Boys'
		}
	},
	{
		path: 'add-delivery-boy',
		component: AddEditDeliveryBoyComponent,
		data: {
			title: 'Add Delivery Boy'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DeliveryBoyRoutingModule {
}
