import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealService } from "../deals.service";
import { ProductService } from "../../products/products.service";
import { CategoryService } from "../../categories/category.service";
import { forkJoin } from "rxjs";
import { UtilService } from "../../../service/util.service";
import { DealModel } from '../deals.component';
import { CategoryModel } from "../../categories/categories.component";
import { ProductModel } from "../../products/products.model";

@Component({
	selector: 'app-add-edit-deal',
	templateUrl: './add-edit-deal.component.html',
	styleUrls: ['./add-edit-deal.component.scss']
})
export class AddEditDealComponent implements OnInit {
	public isLoading = false;
	public categories: Array<CategoryModel> = [];
	public products: Array<ProductModel> = [];
	public dealTypes: Array<any> = [];
	public imageUrl: any = 'assets/img/blank.png';
	public deal: DealModel = {
		title: null,
		description: null,
		dealPercent: null,
		categoryId: null,
		productId: null,
		status: true,
		imageId: null,
		imageUrl: null,
		filePath:'',
		topDeal: null,
		dealType: '',
	};
	public isDisabled: boolean = false;
	public dealId: string = null;
	public isImageSelected: boolean = false;

	constructor(
		private utilService: UtilService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private dealService: DealService,
		private productService: ProductService,
		private categoryService: CategoryService
	) {
		this.activatedRoute.params.subscribe(params => {
			this.dealId = params['id'];
			if (this.dealId) this.getDealDetail();
			this.loadOthers();
		})
	}

	ngOnInit() {
	}

	// Get deal detail
	private getDealDetail(): void {
		this.isLoading = true;
		this.dealService.getById(this.dealId).subscribe((res: any) => {
			this.isLoading = false;
			this.deal = res.response_data;
			this.imageUrl = this.deal.imageUrl;
			if (this.deal.filePath) this.isImageSelected = true;
		}, error => this.isLoading = false);
	}

	// Get dropdown data
	private loadOthers(): void {
		const category$ = this.categoryService.getAllEnabled();
		const products$ = this.productService.getAllProductDropdown();
		const dealType$ = this.dealService.getTypes();
		this.isLoading = true;
		forkJoin([category$, products$, dealType$]).subscribe((res: any) => {
			this.isLoading = false;
			this.categories = res[0].response_data || [];
			this.products = res[1].response_data || [];
			this.dealTypes = res[2].response_data || [];
		}, error => this.isLoading = false);
	}

	// Upload deal image
	protected uploadImage(event) {
		const formData = new FormData();
		formData.append('file', event.target.files[0]);
		this.isImageSelected = true;
		this.isDisabled = true;
		this.isLoading = true;
		this.utilService.uploadImage(formData).subscribe(res => {
			this.imageUrl = res.response_data.url;
			this.isLoading = false;
			this.isDisabled = false;
			this.utilService.successMessage("IMAGE_UPLOADED", true);
			this.deal.imageUrl = res.response_data.url;
			this.deal.imageId = res.response_data.key;
			this.deal.filePath = res.response_data.filePath;
		}, error => {
			this.isDisabled = false;
			this.isLoading = false;
		});
	}

	// check operation type
	public checkOperationType(): void {
		if (this.deal.imageUrl === undefined || this.deal.imageUrl === '' || this.deal.imageUrl === null) {
			return this.utilService.errorMessage("IMAGE_REQUEST", true);
		}
		if (!this.deal.filePath)  return this.utilService.infoMessage("CHANGE_DEAL_IMAGE");

		if (this.deal.dealType === this.dealTypes["CATEGORY"])  this.deal.productId = null;
		else this.deal.categoryId = null;

		if (this.dealId)  this.updateDeal();
		else this.saveDeal();
	}

	// Create deal
	private saveDeal(): void {
		this.isLoading = true;
		this.dealService.save(this.deal).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['/deals']);
		}, error => this.isLoading = false);
	}

	// Update deal
	private updateDeal(): void {
		this.isLoading = true;
		this.dealService.update(this.dealId, this.deal).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data,);
			this.router.navigate(['/deals']);
		}, error => this.isLoading = false);
	}
}
