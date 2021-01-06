import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './categories.component';
import { AddEditCategoryComponent } from "./add-edit-category/add-edit-category.component";
import { ViewCategoryComponent } from "./view-category/view-category.component";

const routes: Routes = [
	{
		path: '',
		component: CategoryComponent,
		data: {
			title: 'Categories'
		}
	},
	{
		path: 'add-category',
		component: AddEditCategoryComponent,
		data: {
			title: 'Add category'
		}
	},
	{
		path: 'edit-category/:id',
		component: AddEditCategoryComponent,
		data: {
			title: 'Edit category'
		}
	},
	{
		path: 'view-category/:id',
		component: ViewCategoryComponent,
		data: {
			title: 'View category'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CategoriesRoutingModule {
}
