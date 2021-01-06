import { Injectable } from "@angular/core";
import { CrudService } from "../../service/crud.service";
import { Observable } from "rxjs";
import { BannerModel } from "./banner.component";

@Injectable()
export class BannerService {
	constructor(
		private crud: CrudService
	) {
	}

	// Get All banner
	public getAll(page: number, limit: number, search?: string): Observable<any> {
		return this.crud.getData(`/banners/admin/list?page=${page}&limit=${limit}&q=${search}`);
	}

	// Get banner detail by bannerId
	public getById(bannerId: string): Observable<any> {
		return this.crud.getData(`/banners/admin/detail/${bannerId}`);
	}

	// Get All banner type
	public getTypes(): Observable<any> {
		return this.crud.getData(`/banners/admin/type/list`);
	}

	// Create banner
	public save(banner: BannerModel): Observable<any> {
		return this.crud.saveData('/banners/admin/create', banner);
	}

	// Update banner by bannerId
	public update(bannerId: string, banner: BannerModel): Observable<any> {
		return this.crud.updateData(`/banners/admin/update/${bannerId}`, banner);
	}

	// Delete banner by bannerId
	public delete(bannerId: string): Observable<any> {
		return this.crud.deleteData(`/banners/admin/delete/${bannerId}`)
	}
}
