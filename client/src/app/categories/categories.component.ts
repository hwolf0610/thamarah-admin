import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CategoryService } from "./category.service";
import { UtilService } from "../../service/util.service";
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export interface CategoryModel {
	_id?: string;
	title: string,
	description: string,
	imageUrl: string,
	imageId: string,
	filePath: string
	status?: boolean;
}

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss'],
	providers: [DecimalPipe]
})
export class CategoryComponent implements OnInit {
	public isLoading = false;
	public categories: Array<CategoryModel> = [];
	public total: number = 0;
	public page: number = 1;
	public limit: number = 25;
	public search: string = '';
	@ViewChild('searchCategory', { static: true }) searchCategory: ElementRef;

	constructor(
		private categoryService: CategoryService,
		private utilService: UtilService
	) {
		this.getAllCategory();
	}

	ngOnInit() {
		fromEvent(this.searchCategory.nativeElement, 'keyup').pipe(
			map((event: any) => { return event.target.value; }),
			debounceTime(500),
			distinctUntilChanged()
		).subscribe((search: string) => {
			this.page = 1;
			if (search.length > 2) {
				this.search = search;
				this.getAllCategory();
			} else if (search.length == 0) {
				this.search = '';
				this.getAllCategory();
			}
			return;
		});
	}

	// Get all category
	private getAllCategory(): void {
		this.isLoading = true;
		this.categoryService.getAll(this.page, this.limit, this.search).subscribe((res: any) => {
			this.isLoading = false;
			this.categories = res.response_data;
			this.total = res.total || this.categories.length;
		}, error => this.isLoading = false);
	}

	// Update category status
	public statusUpdate(id: string, status: boolean): void {
		let body = { status: status };
		this.isLoading = true;
		this.categoryService.updateStatus(id, body).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.getAllCategory();
		}, error => this.isLoading = false);
	}

	// Pagination
	public pageChange(page: number): void {
		this.page = page;
		this.getAllCategory();
	}

	// Delete category
	public deleteCategory(categoryId: string): void {
		if (confirm(this.utilService.getAlertField())) {
			this.isLoading = true;
			this.categoryService.delete(categoryId).subscribe((res: any) => {
				this.isLoading = false;
				this.utilService.successMessage(res.response_data);
				this.getAllCategory();
			}, error => this.isLoading = false);
		}
	}
}