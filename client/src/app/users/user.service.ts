import { Injectable } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Observable } from "rxjs";
import { ChangePasswordModel, UserInfoModel } from "../settings/my-profile/my-profile.component";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private crud: CrudService) {
    }

    // Get all
    public getAll(page: number, limit: number, search?: string): Observable<any> {
        return this.crud.getData(`/users/admin/list?page=${page}&limit=${limit}&q=${search}`);
    };

    // Update status
    public updateStatus(id: string, statusInfo): Observable<any> {
        return this.crud.updateData(`/users/admin/status-update/${id}`, statusInfo);
    }

    // sends push notification to all users
    public sendNotification(notificationData): Observable<any> {
        return this.crud.saveData('/users/admin/send/pushnotification/', notificationData);
    }

    // Get My Profile
    public getMyProfile(): Observable<any> {
        return this.crud.getData('/users/me');
    }

    // Update My Profile
    public updateMyProfile(profileInfo: UserInfoModel): Observable<any> {
        return this.crud.updateData('/users/update/profile', profileInfo);
    }

    // Change password
    public changePassword(passwordData: ChangePasswordModel): Observable<any> {
        return this.crud.saveData('/users/change-password', passwordData);
    }
}
