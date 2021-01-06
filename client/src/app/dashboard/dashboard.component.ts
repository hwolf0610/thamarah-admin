import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from "../settings/setting.service";
import { OrderService } from "../orders/order.service";
import { ToastEnum, UtilService } from "../../service/util.service";

export interface GraphModel {
	name: string;
	value: number;
}

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
	public view: Array<any> = [800, 500];
	public graphData: Array<GraphModel> = [];
	public showXAxis: boolean = true;
	public showYAxis = true;
	public gradient = false;
	public xAxisLabel = 'Month & Year';
	public yAxisLabel = 'Earnings';
	public totalCategory = 0;
	public totalOrder = 0;
	public totalPrice = 0;
	public totalProduct = 0;

	public colorScheme = {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
	};
	single: any[] = [
		{
			'name': 'Germany',
			'value': 8940000
		},
		{
			'name': 'USA',
			'value': 5000000
		},
		{
			'name': 'France',
			'value': 7200000
		},
		{
			'name': 'UK',
			'value': 6200000
		}
	];
	showLegend: boolean = false;
	showLabels: boolean = false;
	isDoughnut: boolean = false;
	legendPosition: string = 'below';
	public dataInfo = {
		currencySymbol: '',
		currencyCode: '',
	};
	constructor(
		private crud: CrudService,
		private utilService: UtilService,
		public translate: TranslateService,
		private settingsService: SettingService,
		private orderService: OrderService
	) {
		this.getInfo();
	}

	ngOnInit() {
		this.crud.language$.subscribe(json => {
			if (json) {
				this.xAxisLabel = json["MONTH_YEAR"];
				this.yAxisLabel = json["EARNINGS"];
			}
		});
		this.getGraphData();
	}

	// contains current selected user currency
	private getInfo(): void {
		this.settingsService.getCurrency().subscribe((res: any) => {
			if (res.response_code === 200) {
				this.dataInfo = {
					currencySymbol: res.response_data.currencySymbol,
					currencyCode: res.response_data.currencyCode,
				}
			} else {
				this.dataInfo.currencySymbol = '$';
				this.dataInfo.currencyCode = 'USD';
			}
		}, error => {
			this.dataInfo = {
				currencySymbol: '$',
				currencyCode: 'USD',
			}
		});
	}

	// get's graph data
	private getGraphData(): void {
		this.orderService.getChart().subscribe((res: any) => {
			if (res.response_code !== 200) {
				this.utilService.showToast("NO_GRAPH_DATA", "ERROR", ToastEnum.ERROR);
			} else {
				let graphData: Array<GraphModel> = [];
				if (res.response_data.graph) {
					res.response_data.graph.data.forEach((val, index) => {
						graphData.push({name: res.response_data.graph.labels[index], value: val});
					});
				}
				this.graphData = graphData;
				this.totalCategory = res.response_data.totalCategory;
				this.totalOrder = res.response_data.totalOrder;
				this.totalPrice = res.response_data.totalPrice;
				this.totalProduct = res.response_data.totalProduct;
			}
		})
	}
}
