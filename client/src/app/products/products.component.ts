import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CrudService } from '../../service/crud.service';
import { SubCategoryListModel } from "../sub-category/sub-category.component";
import { ProductService } from "./products.service";
import { CategoryService } from "../categories/category.service";
import { SubCategoryService } from "../sub-category/sub-category.service";
import { UtilService } from "../../service/util.service";
import { CategoryModel } from 'app/categories/categories.component';
import { ProductModel } from 'app/products/products.model';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss'],
	providers: [DecimalPipe]
})
export class ProductComponent implements OnInit {
	public products: Array<ProductModel> = [];
	public page: number = 1;
	public limit: number = 25;
	public total: number = 0;
	public categories: Array<CategoryModel> = [];
	public subCategories: Array<SubCategoryListModel> = [];
	public selectedCategory: string = null;
	public selectedSubCategory: string = null;
	public isLoading: boolean = false;

	constructor(
		private api: CrudService,
		private utilService: UtilService,
		private productService: ProductService,
		private categoryService: CategoryService,
		private subCategoryService: SubCategoryService
	) {
		this.loadProduct();
		this.getAllCategory();
	}

	ngOnInit() {
	}

	// Get all product
	private loadProduct() {
		if (!this.selectedCategory && !this.selectedSubCategory) {
			this.getAllProduct();
		} else if (this.selectedCategory && !this.selectedSubCategory) {
			this.getAllProductByCategory();
		} else if (this.selectedCategory && this.selectedSubCategory) {
			this.getAllProductBySubCategory();
		}
	}

	private getAllCategory(): void {
		this.isLoading = true;
		this.categoryService.getAllEnabled().subscribe((res: any) => {
			this.isLoading = false;
			this.categories = res.response_data || [];
		}, error => this.isLoading = false)
	}

	// Filter products by category and sub category
	public filterByCategory(): void {
		this.selectedSubCategory = null;
		this.subCategories = [];

		if (this.selectedCategory) {
			this.isLoading = true;
			this.subCategoryService.getAllByCategoryId(this.selectedCategory).subscribe((res: any) => {
				this.isLoading = false;
				this.subCategories = res.response_data || [];
			}, error => this.isLoading = false);
		}
		this.loadProduct();
	}

	// Pagination
	public pageChange(page: number): void {
		this.page = page;
		this.loadProduct();
	}

	// filters products by categories
	public filterBySubCategory(): void {
		if (!this.selectedSubCategory) this.subCategories = [];
		this.loadProduct();
	}

	// Get all product by category
	private getAllProductByCategory(): void {
		this.isLoading = true;
		this.productService.getAllByCategoryId(this.selectedCategory, this.page, this.limit).subscribe((res: any) => {
			this.isLoading = false;
			this.products = res.response_data;
			this.total = res.total;
		}, error => this.isLoading = false);
	}

	// Get all product by sub category
	private getAllProductBySubCategory(): void {
		this.isLoading = true;
		this.productService.getAllBySubCategoryId(this.selectedSubCategory, this.page, this.limit).subscribe((res: any) => {
			this.isLoading = false;
			this.products = res.response_data;
			this.total = res.total;
		}, error => this.isLoading = false);
	}

	// Get all product
	private getAllProduct(): void {
		this.isLoading = true;
		this.productService.getAll(this.page, this.limit).subscribe((res: any) => {
			this.isLoading = false;
			this.products = res.response_data || [];
			this.total = res.total || 0;
		}, error => this.isLoading = false);
	}

	// Update product status
	public updateStatus(id: string, status: boolean): void {
		let body = { status: status };
		this.isLoading = true;
		this.productService.updateStatus(id, body).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.loadProduct();
		}, error => this.isLoading = false);
	}

	// Import products
	public importProduct(event): void {
		const formData = new FormData();
		formData.append('file', event.target.files[0]);
		this.productService.import(formData).subscribe((res: any) => {
			this.utilService.successMessage(res.response_data);
		});
	}

	// Export products
	public exportProduct(): void {
		this.isLoading = true;
		this.productService.export().subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage("REPORT_REQUEST", true);
			this.api.setProductExportRequest(true);
		}, error => this.isLoading = false);
	}

	// Download base template for import
	public downloadBaseTemplate(): void {
		this.productService.getImportTemplate().subscribe((res: any) => {
			window.open(res.response_data.url, 'blank');
		});
	}

	// opens file picker input
	public openFilePickerInput(): void {
		const element = document.getElementById('file-input');
		if (element) {
			element.click();
		}
	}

	// Delete product
	public deleteProduct(productId: string): void {
		if (confirm(this.utilService.getAlertField())) {
			this.isLoading = true;
			this.productService.delete(productId).subscribe((res: any) => {
				this.isLoading = false;
				this.utilService.successMessage(res.response_data);
				this.loadProduct();
			}, error => this.isLoading = false);
		}
	}
}
