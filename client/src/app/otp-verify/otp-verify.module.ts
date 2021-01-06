import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ChartistModule} from 'ng-chartist';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatchHeightModule} from "../shared/directives/match-height.directive";
import {OtpVerifyComponent} from './otp-verify.component';
import {OtpRoutingmodule} from './otp-verify-routing.module';
import {FormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {CustomLoader} from "../custom-loader";
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../service/crud.service";
import {AuthService} from "../pages/login/auth.service";


@NgModule({
    imports: [
        CommonModule,
        OtpRoutingmodule,
        NgbModule,
        FormsModule,
        ChartistModule,
        MatchHeightModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useClass: CustomLoader,
                deps: [HttpClient, CrudService],
                multi: true
            }
        })
    ],
    exports: [],
    declarations: [
        OtpVerifyComponent
    ],
    providers: [AuthService],
})
export class OtpVerifyModule {
}
