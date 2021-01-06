import { Injectable } from "@angular/core";
import { CrudService } from "../../service/crud.service";
import { Observable } from "rxjs";

@Injectable()
export class CategoryService {
	constructor(private crud: CrudService) {
	}

	// Get all category
	public getAll(page: number, limit: number, search?: string): Observable<any> {
		return this.crud.getData(`/categories/admin/list?page=${page}&limit=${limit}&q=${search}`);
	}

	// Get all category for dropdown
	public getAllEnabled(): Observable<any> {
		return this.crud.getData('/categories/admin/dropdown-list');
	}

	// Get category by Id
	public getById(categoryId: string): Observable<any> {
		return this.crud.getData(`/categories/admin/detail/${categoryId}`);
	}

	// Create category
	public save(categoryData): Observable<any> {
		return this.crud.saveData('/categories/admin/create', categoryData);
	}

	// Update category
	public update(categoryId: string, categoryData): Observable<any> {
		return this.crud.updateData(`/categories/admin/update/${categoryId}`, categoryData);
	}

	// Updates category status
	public updateStatus(categoryId: string, categoryData): Observable<any> {
		return this.crud.updateData(`/categories/admin/status-update/${categoryId}`, categoryData);
	}

	// Delete category
	public delete(categoryId: string): Observable<any> {
		return this.crud.deleteData(`/categories/admin/delete/${categoryId}`);
	}
}
