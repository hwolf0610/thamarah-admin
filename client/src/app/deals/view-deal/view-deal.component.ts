import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealService } from "../deals.service";

@Component({
	selector: 'app-view-deal',
	templateUrl: './view-deal.component.html',
	styleUrls: ['./view-deal.component.scss']
})
export class ViewDealComponent implements OnInit {
	public isLoading = false;
    public deal = {
		status: null,
		_id: '',
		title: '',
		description: '',
		dealPercent: null,
		productId: null,
		productName: null,
		categoryId: null,
		categoryName: null,
		imageUrl: '',
		imageId: '',
		dealType: '',
	}
	private dealId: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private dealService: DealService
	) {
		this.route.params.subscribe((response: any) => {
			this.dealId = response.id;
			this.getDealInfo();
		});
	}

	ngOnInit() {
	}

	// Get deal info
	private getDealInfo(): void {
		this.isLoading = true;
		this.dealService.getById(this.dealId).subscribe((res: any) => {
			this.isLoading = false;
			this.deal = res.response_data;
		}, error => this.isLoading = false);
	}
}
