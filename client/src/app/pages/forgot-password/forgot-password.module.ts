import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ForgotpasswordRoutingModule} from './forgot-password-routing.module';
import {ForgotPasswordComponent} from './forgot-password.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {CustomLoader} from "../../custom-loader";
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../../service/crud.service";
import {AuthService} from "../login/auth.service";


@NgModule({
    imports: [
        CommonModule,
        ForgotpasswordRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
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
        ForgotPasswordComponent
    ],
    providers: [AuthService],
})
export class ForgotpasswordModule {
}
