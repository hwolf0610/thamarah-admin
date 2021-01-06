import {Injectable} from "@angular/core";
import {CrudService} from "../../service/crud.service";
import {Observable} from "rxjs";

@Injectable()
export class CouponService {
    constructor(private crud: CrudService) {
    }

    // Get all coupon
    public getAll(page: number, limit: number, search?: string): Observable<any> {
        return this.crud.getData(`/coupons/admin/list?page=${page}&limit=${limit}&q=${search}`);
    }

    // Get coupon by Id
    public getById(couponId: string): Observable<any> {
        return this.crud.getData(`/coupons/admin/detail/${couponId}`);
    }

    // Create coupon
    public save(couponData): Observable<any> {
        return this.crud.saveData('/coupons/admin/create/', couponData);
    }

    // Update coupon
    public update(couponId: string, couponData): Observable<any> {
        return this.crud.updateData(`/coupons/admin/update/${couponId}`, couponData);
    }

    // Update coupon status
    public updateStatus(couponId: string, statusData): Observable<any> {
        return this.crud.updateData(`/coupons/admin/status-update/${couponId}`, statusData);
    }

    // Delete coupon
    public delete(couponId: string): Observable<any> {
        return this.crud.deleteData(`/coupons/admin/delete/${couponId}`);
    }
}
