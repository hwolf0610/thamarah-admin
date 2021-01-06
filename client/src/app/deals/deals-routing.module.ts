import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealComponent } from './deals.component';
import { AddEditDealComponent } from "./add-edit-deal/add-edit-deal.component";
import { ViewDealComponent } from "./view-deal/view-deal.component";

const routes: Routes = [
    {
        path: '',
        component: DealComponent,
        data: {
            title: 'Deals'
        }
    },
    {
        path: 'add-deal',
        component: AddEditDealComponent,
        data: {
            title: 'Add deal'
        }
    },
    {
        path: 'edit-deal/:id',
        component: AddEditDealComponent,
        data: {
            title: 'Edit deal'
        }
    },
    {
        path: 'view-deal/:id',
        component: ViewDealComponent,
        data: {
            title: 'View deal'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DealRoutingModule {
}
