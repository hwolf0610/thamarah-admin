import { Injectable } from "@angular/core";
import { CrudService } from "../../service/crud.service";
import { Observable } from "rxjs";
import { SubCategoryDataModel } from "./sub-category.component";

@Injectable()
export class SubCategoryService {
	constructor(private crud: CrudService) {
	}

	// Get all sub category
	public getAll(page: number, limit: number, search?: string): Observable<any> {
		return this.crud.getData(`/sub-categories/admin/list?page=${page}&limit=${limit}&q=${search}`);
	}

	// Get all enabled sub category
	public getAllEnabled(): Observable<any> {
		return this.crud.getData('/sub-categories/list');
	}

	// Get sub category by Id
	public getById(subCategoryId: string): Observable<any> {
		return this.crud.getData(`/sub-categories/admin/detail/${subCategoryId}`);
	}

	// Get all sub category by categoryId
	public getAllByCategoryId(categoryId: string): Observable<any> {
		return this.crud.getData(`/sub-categories/admin/dropdown-list/${categoryId}`);
	}

	// Save sub category
	public save(subCategory: SubCategoryDataModel): Observable<any> {
		return this.crud.saveData('/sub-categories/admin/create', subCategory);
	}

	// Update sub category
	public update(subCategoryId: string, subCategory: SubCategoryDataModel): Observable<any> {
		return this.crud.updateData(`/sub-categories/admin/update/${subCategoryId}`, subCategory);
	}

	// Update sub category status
	public updateStatus(subCategoryId: string, statusInfo): Observable<any> {
		return this.crud.updateData(`/sub-categories/admin/status-update/${subCategoryId}`, statusInfo);
	}

	// Delete sub category
	public delete(subCategoryId: string): Observable<any> {
		return this.crud.deleteData(`/sub-categories/admin/delete/${subCategoryId}`);
	}
}
