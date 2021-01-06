import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {CustomLoader} from "../../custom-loader";
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../../service/crud.service";
import {AuthService} from "./auth.service";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
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
        LoginComponent
    ],
    providers: [AuthService],
})
export class LoginModule {
}
