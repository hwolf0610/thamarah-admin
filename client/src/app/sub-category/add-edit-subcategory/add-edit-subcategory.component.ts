import { Component, OnInit } from '@angular/core';
import { SubCategoryService } from "../sub-category.service";
import { UtilService } from "../../../service/util.service";
import { SubCategoryDataModel, SubCategoryListModel } from "../sub-category.component";
import { CategoryService } from "../../categories/category.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryModel } from "../../categories/categories.component";

@Component({
	selector: 'app-add-edit-subcategory',
	templateUrl: './add-edit-subcategory.component.html',
	styleUrls: ['./add-edit-subcategory.component.css']
})
export class AddEditSubCategoryComponent implements OnInit {
	public isLoading = false;
	public subCategory: SubCategoryDataModel = {
		title: '',
		description: '',
		categoryId: ''
	};
	public categories: Array<CategoryModel> = [];
	public subCategoryId: string = null;

	constructor(
		private subCategoryService: SubCategoryService,
		private utilService: UtilService,
		private categoryService: CategoryService,
		private router: Router, private activatedRoute: ActivatedRoute
	) {
		this.activatedRoute.params.subscribe(params => {
			this.subCategoryId = params['id'];
			if (this.subCategoryId) this.getSubCategoryDetail();
			this.getAllCategory();
		});
	}

	ngOnInit(): void {
	}

	// Get sub category detail
	private getSubCategoryDetail() {
		this.isLoading = true;
		this.subCategoryService.getById(this.subCategoryId).subscribe((res: any) => {
			this.isLoading = false;
			this.subCategory = res.response_data;
		}, error => this.isLoading = false)
	}

	// Get all enabled category
	private getAllCategory(): void {
		this.isLoading = true;
		this.categoryService.getAllEnabled().subscribe((res: any) => {
			this.isLoading = false;
			this.categories = res.response_data || [];
		}, error => this.isLoading = false);
	}

	// checks operation type
	public checkOperationType(): void {
		if (this.subCategoryId) this.updateSubCategory();
		else this.saveSubCategory();
	}

	// Save sub category
	public saveSubCategory(): void {
		this.isLoading = true;
		this.subCategoryService.save(this.subCategory).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['sub-category']);
		}, error => this.isLoading = false);
	}

	// Update sub category
	public updateSubCategory(): void {
		this.isLoading = true;
		this.subCategoryService.update(this.subCategoryId, this.subCategory).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['sub-category']);
		}, error => this.isLoading = false)
	}
}
