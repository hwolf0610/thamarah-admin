import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubCategoryService } from "./sub-category.service";
import { UtilService } from "../../service/util.service";
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export interface SubCategoryDataModel {
	title: string;
	categoryId: string;
	description: string;
}

export interface SubCategoryListModel {
	title: string;
	categoryId: string;
	categoryName: string;
	description: string;
	_id: string;
	status: boolean;
}

@Component({
	selector: 'app-sub-category-component',
	templateUrl: './sub-category.component.html',
	styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
	public isLoading = false;
	public page: number = 1;
	public limit: number = 25;
	public total: number = 0;
	public search: string = '';
	public subCategories: Array<SubCategoryListModel> = [];
	@ViewChild('searchSubCategory', { static: true }) searchSubCategory: ElementRef;

	constructor(
		private utilService: UtilService,
		private subCategoryService: SubCategoryService
	) {
		this.getAllSubCategory();
	}

	ngOnInit() {
		fromEvent(this.searchSubCategory.nativeElement, 'keyup').pipe(
			map((event: any) => { return event.target.value; }),
			debounceTime(500),
	  		distinctUntilChanged()
		).subscribe((search: string) => {
			this.page = 1;
			if (search.length > 2) {
				this.search = search;
				this.getAllSubCategory();
			} else if (search.length == 0) {
				this.search = '';
				this.getAllSubCategory();
			}
			return;
		});
	}

	// Get all sub category
	private getAllSubCategory(): void {
		this.isLoading = true;
		this.subCategoryService.getAll(this.page, this.limit, this.search).subscribe((res: any) => {
			this.isLoading = false;
			this.subCategories = res.response_data || [];
			this.total = res.total || this.subCategories.length;
		}, error => this.isLoading = false);
	}

	// Updates sub category status
	public updateStatus(id: string, status: boolean) {
		const body = { status: status };
		this.isLoading = true;
		this.subCategoryService.updateStatus(id, body).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.getAllSubCategory();
		}, error => this.isLoading = false)
	}

	// Delete sub category
	public deleteSubCategory(subCategoryId: string): void {
		if (confirm(this.utilService.getAlertField())) {
			this.isLoading = true;
			this.subCategoryService.delete(subCategoryId).subscribe((res: any) => {
				this.isLoading = false;
				this.utilService.successMessage(res.response_data);
				this.getAllSubCategory();
			}, error => this.isLoading = false);
		}
	}

	// Pagination
	public pageChange(page: number): void {
		this.page = page;
		this.getAllSubCategory();
	}
}
