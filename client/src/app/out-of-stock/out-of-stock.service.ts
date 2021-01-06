import { Injectable } from "@angular/core";
import { CrudService } from "../../service/crud.service";
import { Observable } from "rxjs";

@Injectable()
export class OutOfStockService {
	constructor(private crud: CrudService) {
	}
	
// Get all product
public getAll(page: number = 1, limit: number = 25): Observable<any> {
	return this.crud.getData(`/product-out-of-stock/admin/list`);
}
}
