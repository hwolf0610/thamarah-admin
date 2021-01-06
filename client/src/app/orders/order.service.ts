import { Injectable } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Observable } from "rxjs";

@Injectable()
export class OrderService {
	constructor(private crud: CrudService) {
	}

	// Get all order
	public getAll(page: number, limit: number, status: string, id: string): Observable<any> {
		return this.crud.getData(`/orders/admin/list?page=${page}&limit=${limit}${status !== 'All' ? '&orderStatus=' + status : ''}${id ? ('&assignedToId=' + id) : ''}`)
	}

	// Get order detail
	public getById(orderId: string): Observable<any> {
		return this.crud.getData(`/orders/admin/detail/${orderId}`);
	}

	// updates order status
	public updateStatus(orderId: string, data: any): Observable<any> {
		return this.crud.updateData(`/orders/admin/status-update/${orderId}`, data);
	}

	// Assign order to delivery boy
	public assignOrder(orderId: string, assignOrderData): Observable<any> {
		return this.crud.updateData(`/orders/admin/assign/delivery-boy/${orderId}`, assignOrderData);
	}

	// Export order
	public export(dateData): Observable<any> {
		return this.crud.saveData('/orders/admin/export-file', dateData);
	}

	// Check order export status
	public checkExportStatus(): Observable<any> {
		return this.crud.getData('/orders/admin/export-file/download');
	}

	// Delete export file
	public deleteExportFile(publicId: string): Observable<any> {
		return this.crud.deleteData(`/orders/admin/export-file/delete/${publicId}`);
	}

	// Order chart
	public getChart(): Observable<any> {
		return this.crud.getData('/orders/admin/charts');
	}
}
