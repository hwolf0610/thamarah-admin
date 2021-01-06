import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './products.component';
import { AddEditProductComponent } from "./add-edit-product/add-edit-product.component";
import { ViewProductComponent } from "./view-product/view-product.component";

const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        data: {
            title: 'Products'
        }
    },
    {
        path: 'add-product',
        component: AddEditProductComponent,
        data: {
            title: 'Add product'
        }
    },
    {
        path: 'edit-product/:id',
        component: AddEditProductComponent,
        data: {
            title: 'Edit product'
        }
    },
    {
        path: 'view-product/:id',
        component: ViewProductComponent,
        data: {
            title: 'View product'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule {
}
