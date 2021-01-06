import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from "../category.service";
import { UtilService } from "../../../service/util.service";
import { CategoryModel } from '../categories.component';

@Component({
	selector: 'app-add-edit-category',
	templateUrl: './add-edit-category.component.html',
	styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
	public isLoading = false;
	public imageUrl: any = 'assets/img/blank.png';
	public category: CategoryModel = {
		title:'',
		description: '',
		imageId: '',
		imageUrl: '',
		filePath: '',
	};
	public categoryId: string = null;

	constructor(
		private router: Router,
		private http: HttpClient,
		private categoryService: CategoryService,
		private utilService: UtilService,
		private activatedRoute: ActivatedRoute
	) {
		this.activatedRoute.params.subscribe(params => {
			this.categoryId = params['id'];
			if (this.categoryId) this.getCategoryDetail();
		})
	}

	ngOnInit() {
	}

	// Get category info
	private getCategoryDetail(): void {
		this.isLoading = true;
		this.categoryService.getById(this.categoryId).subscribe((res: any) => {
			this.isLoading = false;
			this.category = res.response_data;
			this.imageUrl = this.category.imageUrl;
		}, error => this.isLoading = false);
	}

	public uploadImage(event) {
		if (event.target.files && event.target.files[0]) {
			let formData = new FormData();
			formData.append('file', event.target.files[0]);
			this.isLoading = true;
			this.utilService.uploadImage(formData).subscribe(res => {
				this.isLoading = false;
				this.utilService.successMessage("IMAGE_UPLOADED", true);
				this.imageUrl = res.response_data.url;
				this.category.imageUrl = res.response_data.url;
				this.category.imageId = res.response_data.key;
				this.category.filePath = res.response_data.filePath;
			}, error => this.isLoading = false);
		}
	}

	// check operation type
	public checkOperationType(): void {
		if (this.category.imageUrl === undefined || this.category.imageUrl === '' || this.category.imageUrl === null) {
			return this.utilService.errorMessage("IMAGE_REQUEST", true);
		}
		if (!this.category.filePath) {
			return this.utilService.infoMessage("CHANGE_CATEGORY_IMAGE");
		}
		if (!this.categoryId) this.saveCategory();
		else this.updateCategory();
	}

	// Create category
	public saveCategory(): void {
		this.isLoading = true;
		this.categoryService.save(this.category).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['/categories']);
		}, error => this.isLoading = false);
	}

	// Updates category
	public updateCategory(): void {
		this.isLoading = true;
		this.categoryService.update(this.categoryId, this.category).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['/categories']);
		}, error => this.isLoading = false);
	}
}
