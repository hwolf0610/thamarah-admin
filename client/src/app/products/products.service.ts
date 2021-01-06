import { Injectable } from "@angular/core";
import { CrudService } from "../../service/crud.service";
import { Observable } from "rxjs";
import { ProductModel } from "./products.model";
import { Headers, Http } from "@angular/http";
import { environment } from "../../environments/environment";

@Injectable()
export class ProductService {
	constructor(
		private crud: CrudService,
		private http: Http
	) {
	}

	// Get all product
	public getAll(page: number = 1, limit: number = 25): Observable<any> {
		return this.crud.getData(`/products/admin/list?page=${page}&limit=${limit}`);
	}

	// Get all product for dropdown
	public getAllProductDropdown(): Observable<any> {
		return this.crud.getData(`/products/admin/dropdown-list`);
	}

	// Get product detail
	public getById(productId: string): Observable<any> {
		return this.crud.getData(`/products/admin/detail/${productId}`);
	}

	// Get all product by categoryId
	public getAllByCategoryId(categoryId: string, page: number, limit: number): Observable<any> {
		return this.crud.getData(`/products/admin/category/${categoryId}?page=${page}&limit=${limit}`);
	}

	// Get all product by subCategoryId
	public getAllBySubCategoryId(subCategoryId: string, page: number, limit: number): Observable<any> {
		return this.crud.getData(`/products/admin/sub-category/${subCategoryId}?page=${page}&limit=${limit}`);
	}

	// Create product
	public save(product: ProductModel): Observable<any> {
		return this.crud.saveData('/products/admin/create', product);
	}

	// Update product
	public update(productId: string, product: ProductModel): Observable<any> {
		return this.crud.updateData(`/products/admin/update/${productId}`, product);
	}

	// Update product status
	public updateStatus(productId: string, statusData): Observable<any> {
		return this.crud.updateData(`/products/admin/status-update/${productId}`, statusData);
	}

	// Export product
	public export(): Observable<any> {
		return this.crud.getData('/products/admin/exports')
	}

	// Checks export status
	public checkExportStatus(): Observable<any> {
		return this.crud.getData('/products/admin/exports/download');
	}

	// Delete exported file
	public deleteExportedFile(publicId: string): Observable<any> {
		return this.crud.deleteData(`/products/admin/exports/${publicId}`);
	}

	// Get import template
	public getImportTemplate(): Observable<any> {
		return this.crud.getData('/products/admin/imports/template');
	}

	// Import
	public import(formData: FormData): Observable<any> {
		const token = atob(atob(atob(sessionStorage.getItem('token'))));
		const headers = new Headers({'Authorization': `Bearer ${token}`});
		return this.http.post(environment.API_ENDPOINT + '/products/admin/imports', formData, { headers });
	}

	// Delete product
	public delete(productId: string): Observable<any> {
		return this.crud.deleteData(`/products/admin/delete/${productId}`);
	}
}
