import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartistModule} from 'ng-chartist';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatchHeightModule} from '../shared/directives/match-height.directive';
import {DashboardComponent} from './dashboard.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
// import { createTranslateLoader } from 'app/app.module';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CustomLoader} from '../custom-loader';
import {SettingService} from "../settings/setting.service";
import {OrderService} from "../orders/order.service";


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbModule,
        ChartistModule,
        MatchHeightModule,
        NgxChartsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useClass: CustomLoader,
                deps: [HttpClient]
            }
        }),

    ],
    exports: [],
    declarations: [
        DashboardComponent
    ],
    providers: [SettingService, OrderService],
})
export class DashboardModule {
}
