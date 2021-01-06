import {TranslateLoader} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {CrudService} from '../service/crud.service';
import {map} from "rxjs/operators";

export class CustomLoader implements TranslateLoader {
    constructor(private httpClient: HttpClient, private crud: CrudService) {
    }

    // get's translation JSON from server based on selected language
    public getTranslation(lang: string): Observable<any> {
        const language$ = this.httpClient.get(`${environment.API_ENDPOINT}/languages/cms?code=${lang}`).pipe(map((data: any) => data.response_data[lang]));
        this.crud.setLanguageJSON(language$);
        return language$;
    }
}
