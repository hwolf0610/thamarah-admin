import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from "../category.service";

@Component({
	selector: 'app-view-category',
	templateUrl: './view-category.component.html',
	styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
	public isLoading = false;
	public category: any;
	private categoryId: any;

	constructor(
		private route: ActivatedRoute,
		private categoryService: CategoryService
	) {
		this.route.params.subscribe((response: any) => {
			this.categoryId = response.id;
			this.getCategoryDetail();
		});
	}

	ngOnInit() {
	}

	// Get category info
	private getCategoryDetail(): void {
		this.isLoading = true;
		this.categoryService.getById(this.categoryId).subscribe((res: any) => {
			this.isLoading = false;
			this.category = res.response_data;
		}, error => this.isLoading = false);
	}
}
