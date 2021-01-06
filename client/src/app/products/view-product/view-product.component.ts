import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from "../products.service";

@Component({
	selector: 'app-view-product',
	templateUrl: './view-product.component.html',
	styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
	public isLoading = false
	public product: any;
	private productId: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private productService: ProductService
	) {
		this.route.params.subscribe((response: any) => {
			this.productId = response.id;
			if (this.productId) this.getProductDetail();
		});
	}

	ngOnInit() {
	}

	// Get product detail
	private getProductDetail() {
		this.isLoading = true;
		this.productService.getById(this.productId).subscribe((res: any) => {
			this.isLoading = false;
			this.product = res.response_data;
		}, error => this.isLoading = false);
	}
}
