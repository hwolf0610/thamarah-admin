import { Injectable } from "@angular/core";
import { CrudService } from "../../service/crud.service";
import { Observable } from "rxjs";
import { DeliveryBoyModel } from "./delivery-boy.component";
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class DeliveryBoyService {
    constructor(private crud: CrudService, private http: Http) {
    }

    // gets dial codes list
    public getDialCodeList(): Observable<any> {
        return this.http.get('assets/json/country_codes.json').pipe(map(res => res.json()), catchError(() => of(null)))
    }

    // Get all delivery Boy
    public getAll(page: number, limit: number, search?: string): Observable<any> {
        return this.crud.getData(`/users/admin/delivery-boy/list?page=${page}&limit=${limit}&q=${search}`);
    }

    // Save delivery Boy
    public save(deliveryBoy: DeliveryBoyModel): Observable<any> {
        return this.crud.saveData('/users/admin/delivery-boy/create', deliveryBoy);
    }

    // Update delivery boy status
    public updateStatus(deliveryBoyId: string, statusData): Observable<any> {
        return this.crud.updateData(`/users/admin/delivery-boy/status-update/${deliveryBoyId}`, statusData);
    }
}
