import { Component, OnInit } from '@angular/core';
import { DeliveryBoyModel, DialCodeList } from '../delivery-boy.component';
import { ActivatedRoute, Router } from "@angular/router";
import { UtilService } from "../../../service/util.service";
import { DeliveryBoyService } from "../delivery-boy.service";

@Component({
	selector: 'app-add-edit-delivery-boy',
	templateUrl: './add-edit-delivery-boy.component.html',
	styleUrls: ['./add-edit-delivery-boy.component.scss']
})
export class AddEditDeliveryBoyComponent implements OnInit {
	public isLoading = false;
	public deliveryBoyId: string = null;
	public deliveryBoy: DeliveryBoyModel = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		mobileNumber: '',
		countryCode: ''
	}
	public dialCodeList: Array<DialCodeList> = [];			// contains list of dial codes
	constructor(
		private router: Router,
		private dbService: DeliveryBoyService,
		private utilService: UtilService,
		private activatedRoute: ActivatedRoute
	) {
		this.activatedRoute.params.subscribe(params => {
			this.deliveryBoyId = params['id'];
			this.getDialCodesList();
		})
	}

	ngOnInit(): void {
	}

	private getDialCodesList(): void {
		this.dbService.getDialCodeList().subscribe((res: any) => {
			this.dialCodeList = res;
		})
	}

	// check operation type
	public checkOperationType(): void {
		if (!this.deliveryBoyId) this.saveDeliveryBoy();
		else this.updateDeliveryBoy();
	}

	saveDeliveryBoy() {
		this.isLoading = true;
		this.dbService.save(this.deliveryBoy).subscribe((res: any) => {
			this.isLoading = false;
			this.utilService.successMessage(res.response_data);
			this.router.navigate(['/delivery-boy']);
		}, error => this.isLoading = false);
	}

	updateDeliveryBoy() {

	}
}
