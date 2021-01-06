import { Component } from "@angular/core";
import { BannerService } from "../banner.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UtilService } from "../../../service/util.service";
import { BannerModel } from "../banner.component";
import { CategoryService } from "../../categories/category.service";
import { ProductService } from "../../products/products.service";
import { forkJoin } from "rxjs";
import { ActiveToast } from "ngx-toastr";
import { CategoryModel } from "../../categories/categories.component";
import { ProductModel } from "../../products/products.model";

@Component({
	selector: 'app-add-edit-banner-component',
	templateUrl: './add-edit-banner.component.html',
	styleUrls: ['./add-edit-banner.component.scss']
})
export class AddEditBannerComponent {
	public isLoading = false;
	public bannerId: string = null;
	public banner: BannerModel = {
		title: null,
		description: null,
		bannerType: null,
		categoryId: null,
		productId: null,
		status: true,
		imageId: null,
		imageUrl: null,
		filePath: ''
	};
	public categories: Array<CategoryModel> = [];
	public products: Array<ProductModel> = [];
	public isImageSelected: boolean = false;
	public isDisabled: boolean = false;
	public bannerTypes: any = {};

	constructor(
		private bannerService: BannerService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private utilService: UtilService,
		private categoryService: CategoryService,
		private productsService: ProductService
	) {
		this.activatedRoute.params.subscribe(params => {
			this.bannerId = params['id'];
			if (this.bannerId) this.getBannerDetail();
			this.loadOthers();
		})
	}

	// Get banner detail
	public getBannerDetail() {
		this.isLoading = true;
		this.bannerService.getById(this.bannerId).subscribe((res: any) => {
			this.isLoading = false;
			this.banner = res.response_data;
			if (this.banner.filePath) this.isImageSelected = true;
		}, error => this.isLoading = false);
	}

	public openFilePicker(): void {
		const fileInputElement = document.getElementById('file-picker-inp');
		if (fileInputElement) fileInputElement.click();
	}

	// Get dropdown data
	public loadOthers(): void {
		const category$ = this.categoryService.getAllEnabled();
		const products$ = this.productsService.getAllProductDropdown();
		const bannerTypes$ = this.bannerService.getTypes();
		this.isLoading = true;
		forkJoin([category$, products$, bannerTypes$]).subscribe((res: any) => {
			this.isLoading = false;
			this.categories = res[0].response_data || [];
			this.products = res[1].response_data || [];
			this.bannerTypes = res[2].response_data || [];
		}, error => this.isLoading = false)
	}

	// Upload banner image
	public uploadImage(event) {
		let formData = new FormData();
		formData.append('file', event.target.files[0]);
		this.isImageSelected = true;
		this.isDisabled = true;
		this.isLoading = true;
		this.utilService.uploadImage(formData).subscribe(res => {
			this.isLoading = false;
			this.isDisabled = false;
			this.utilService.successMessage("IMAGE_UPLOADED", true);
			this.banner.imageUrl = res.response_data.url;
			this.banner.imageId = res.response_data.key;
			this.banner.filePath = res.response_data.filePath;
		}, error => {
			this.isDisabled = false;
			this.isLoading = false;
		});
	}

	// Save click event
	public checkOperationType(): void | ActiveToast<any> {
		if (!this.banner.filePath) return this.utilService.infoMessage("CHANGE_BANNER_IMAGE");
		if (this.bannerId) this.updateBanner();
		else this.saveBanner();
	}

	// Create banner
	private saveBanner(): void {
		this.isLoading = true;
		this.bannerService.save(this.banner).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['banner'])
		}, error => this.isLoading = false);
	}

	// Update banner
	private updateBanner(): void {
		this.isLoading = true;
		this.bannerService.update(this.bannerId, this.banner).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['banner'])
		}, error => this.isLoading = false);
	}
}
