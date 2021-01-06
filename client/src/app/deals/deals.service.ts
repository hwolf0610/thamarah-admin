import { Injectable } from "@angular/core";
import { CrudService } from "../../service/crud.service";
import { Observable } from "rxjs";

@Injectable()
export class DealService {
	constructor(private crud: CrudService) {
	}

	// Get all deal
	public getAll(page: number, limit: number, search?: string): Observable<any> {
		return this.crud.getData(`/deals/admin/list?page=${page}&limit=${limit}&q=${search}`);
	}

	// Get deal Types
	public getTypes(): Observable<any> {
		return this.crud.getData(`/deals/admin/type/list`);
	}

	// Get deal by Id
	public getById(dealId: string): Observable<any> {
		return this.crud.getData(`/deals/admin/detail/${dealId}`);
	}

	// Save deal
	public save(deal): Observable<any> {
		return this.crud.saveData('/deals/admin/create', deal);
	}

	// Update deal
	public update(dealId: string, deal): Observable<any> {
		return this.crud.updateData(`/deals/admin/update/${dealId}`, deal);
	}

	// Update deal status
	public updateStatus(dealId: string, statusData): Observable<any> {
		return this.crud.updateData(`/deals/admin/status-update/${dealId}`, statusData);
	}

	// Delete deal
	public delete(dealId: string): Observable<any> {
		return this.crud.deleteData(`/deals/admin/delete/${dealId}`);
	}
}
