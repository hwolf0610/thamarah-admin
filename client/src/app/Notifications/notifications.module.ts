import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomLoader } from '../custom-loader';
import { NotificationService } from "../notification-list/notification.service";

const routes: Routes = [
	{path: '', component: NotificationsComponent}
]

@NgModule({
	imports: [RouterModule.forChild(routes), FormsModule, CommonModule, TranslateModule.forChild({
		loader: {
			provide: TranslateLoader,
			useClass: CustomLoader,
			deps: [HttpClient]
		}
	})],
	declarations: [NotificationsComponent],
	providers: [NotificationService],
	exports: [RouterModule]
})
export class NotificationsModule {

}
