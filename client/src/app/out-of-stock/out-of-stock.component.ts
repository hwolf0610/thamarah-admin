import { Component, OnInit, TemplateRef } from '@angular/core';
import { OutOfStockService } from "./out-of-stock.service";
import { UtilService } from "../../service/util.service";
import { CrudService } from '../../service/crud.service';

export interface OutOfStockListModel {
	status: boolean;
	_id: string;
	productId: string;
	unit: string;
	title: string;
}
@Component({
	selector: 'app-out-of-stock-component',
	templateUrl: './out-of-stock.component.html',
	styleUrls: ['./out-of-stock.component.scss']
})
export class OutOfStockComponent implements OnInit {
	public products: Array<OutOfStockListModel> = [];
	public isLoading: boolean = false;
	public page: number = 1;
	public limit: number = 25;
	public total: number = 0;
	
	constructor(
		private api: CrudService,
		private utilService: UtilService,
		private outOfStockService: OutOfStockService
	) {
	}

	ngOnInit() {
		this.getAllOutOfStockProduct();
	}
	  
	private getAllOutOfStockProduct(){
		this.isLoading = true;
		this.outOfStockService.getAll(this.page, this.limit).subscribe((res: any) => {
			this.isLoading = false;
			this.products= res.response_data || [];
			this.total = res.total || 0;
		}, error => this.isLoading = false);
	}

	// Pagination
	public pageChange(page: number): void {
		this.page = page;
		this.getAllOutOfStockProduct();
	}	
}
