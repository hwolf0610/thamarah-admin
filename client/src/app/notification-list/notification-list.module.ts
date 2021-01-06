import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { NotificationListComponent } from "./notification-list.component";
import { NotificationService } from "./notification.service";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { CustomLoader } from "../custom-loader";
import { HttpClient } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";

const routes: Routes = [
	{
		path: "",
		component: NotificationListComponent,
	},
];

@NgModule({
	imports: [CommonModule, FormsModule, RouterModule.forChild(routes), TranslateModule.forChild({
		loader: {
			provide: TranslateLoader,
			useClass: CustomLoader,
			deps: [HttpClient]
		}
	}),
		NgxPaginationModule
	],
	declarations: [NotificationListComponent],
	providers: [NotificationService],
	exports: [RouterModule],
})
export class NotificationListModule {
}
