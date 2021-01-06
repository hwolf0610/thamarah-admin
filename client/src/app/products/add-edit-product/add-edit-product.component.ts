import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveToast } from 'ngx-toastr';
import { ImageModel, ProductModel } from '../products.model';
import { SubCategoryListModel } from '../../sub-category/sub-category.component';
import { ProductService } from "../products.service";
import { CategoryService } from "../../categories/category.service";
import { SubCategoryService } from "../../sub-category/sub-category.service";
import { UtilService } from "../../../service/util.service";
import { CategoryModel } from "../../categories/categories.component";

@Component({
	selector: 'app-add-edit-product',
	templateUrl: './add-edit-product.component.html',
	styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
	public isLoading: boolean = false;
	public categories: Array<CategoryModel> = [];
	public subCategories: Array<SubCategoryListModel> = [];
	public imageUrl: any = 'assets/img/emptyimg.png';
	public product: ProductModel = {
		title: '',
		keyWords: '',
		description: '',
		imageUrl: '',
		categoryId: '',
		imageId: '',
		type: '',
		variant: [{
			enable: true,
			productStock: 0,
			unit: '',
			price: 0
		}],
		subCategoryId: null,
		filePath: '',
		sku: null,
		productImages: []
	};
	public isDisabled: boolean = false;
	public productId: string = null;
	constructor(
		private router: Router,
		private utilService: UtilService,
		private productService: ProductService,
		private categoryService: CategoryService,
		private subCategoryService: SubCategoryService,
		private route: ActivatedRoute
	) {
		this.route.params.subscribe(params => {
			this.productId = params['id'];
			if (this.productId) this.getProductDetail();
		});
		this.getAllCategory();
	}

	ngOnInit() {
	}

	// Get all category
	private getAllCategory() {
		this.isLoading = true;
		this.categoryService.getAllEnabled().subscribe((res: any) => {
			this.isLoading = false;
			this.categories = res.response_data || [];
		}, error => this.isLoading = false);
	}

	// Get all sub category by categoryId
	private getAllSubCategoryByCategoryId(categoryId) {
		this.isLoading = true;
		this.subCategoryService.getAllByCategoryId(categoryId).subscribe((res: any) => {
			this.isLoading = false;
			this.subCategories = res.response_data || [];
		}, error => this.isLoading = false);
	}

	// Get product detail
	private getProductDetail(): void {
		this.isLoading = true;
		this.productService.getById(this.productId).subscribe((res: any) => {
			this.isLoading = false;
			this.product = res.response_data;
			this.imageUrl = this.product.imageUrl;
			if (!this.product.productImages) {
				this.product.productImages = [];
			}
			if (this.product.productImages.length === 0) {
				this.product.productImages.push({
					imageId: this.product.imageId,
					imageUrl: this.product.imageUrl,
					filePath: this.product.filePath
				});
			}
			if (this.product.categoryId) {
				this.getAllSubCategoryByCategoryId(this.product.categoryId);
			}
		}, error => this.isLoading = false);
	}

	// Load sub categories by categoryId
	public changeCategory(): void {
		this.product.subCategoryId = null;
		this.getAllSubCategoryByCategoryId(this.product.categoryId);
	}

	// Add to variant list
	public addVariant(): ActiveToast<string> | void {
		const check = this.product.variant.find(v => v.unit === '' || v.price === null || v.price === 0
			|| v.price < 0 || v.enable === null || v.productStock === null || v.productStock === 0 || v.productStock < 0);
		if (check) return this.utilService.warningMessage("VARIANT_ERROR", true);
		this.product.variant.push({ enable: true, productStock: 0, unit: '', price: 0 });
	}

	// remove from variant list
	public removeVariant(removeIndex): void {
		if (this.product.variant.length > 1) {
			this.product.variant.splice(removeIndex, 1);
		}
	}

	// Upload product image
	public uploadProductImage(event): void {
		this.isDisabled = true;
		let formData = new FormData();
		for (let file in event.target.files) {
			const fileItem = event.target.files[Number(file)];
			if (fileItem) {
				formData.append('file', fileItem);
			}
		}
		this.isDisabled = true;
		this.isLoading = true;
		this.utilService.uploadMultipleImage(formData).subscribe(res => {
			this.isLoading = false;
			this.isDisabled = false;
			let images: Array<ImageModel> = [];
			res.response_data.forEach(image => {
				const imageData: ImageModel = {
					imageUrl: image.url,
					imageId: image.key,
					filePath: image.filePath
				};
				images.push(imageData);
			});
			this.product.productImages = this.product.productImages.concat(images);
			this.utilService.successMessage("IMAGE_UPLOADED", true);
		}, error => {
			this.isLoading = false;
			this.isDisabled = false;
			this.product.imageUrl = null;
		});
	}

	// opens image picker dialog
	public openImagePickerWindow(): void {
		if (this.product.productImages.length < 8) {
			const imageInputElement = document.getElementById('product-img-inp');
			imageInputElement.click();
		} else {
			this.utilService.infoMessage("MAX_PRODUCT_IMAGES", true);
		}
	}

	// removes product images
	public removeProductImage(index: number): void {
		if (this.product.productImages.length > 1) {
			this.product.productImages.splice(index, 1);
		} else {
			this.utilService.infoMessage("MIN_PRODUCT_IMAGES", true);
		}
	}

	// check operation type
	public checkOperationType(): void {
		if (this.product.productImages.length === 0) return this.utilService.warningMessage("IMAGE_REQUEST", true);

		const check = this.product.variant.find(v => v.unit === '' || v.price === null || v.price === 0
			|| v.price < 0 || v.enable === null || v.productStock === null || v.productStock === 0 || v.productStock < 0);
		if (check) return this.utilService.warningMessage("VARIANT_ERROR", true);
		if (!this.product.sku) this.product.sku = null;

		if (this.productId) this.updateProduct();
		else this.saveProduct();
	}

	// Save product
	private saveProduct(): void {
		this.isLoading = true;
		this.productService.save(this.product).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['/products']);
		}, error => this.isLoading = false);
	}

	// Update product
	private updateProduct(): void {
		this.isLoading = true;
		this.productService.update(this.productId, this.product).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['/products']);
		}, error => this.isLoading = false);
	}
}
