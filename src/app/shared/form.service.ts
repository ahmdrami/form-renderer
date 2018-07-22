import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormModel, OptionsModel, DynamicOptionModel } from './form-renderer/form-renderer/form-schema';
import { HttpClient } from '@angular/common/http';
import { setValidators } from './form-renderer/set.validator';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable()
export class FormService {
   endpoint = 'api/';
   constructor(private http: HttpClient) {}

   getConfig(): Observable<FormModel[]> {
      return this.http.get<FormModel[]>(`${this.endpoint}config`).pipe(setValidators());
   }

   getFormData(): Observable<any> {
      return this.http.get(`${this.endpoint}formData`);
   }

   getOptionsData(query: string): Observable<any> {
      return this.http.get(`${this.endpoint}${query}`).pipe(
         map((options: DynamicOptionModel[]) => options[0])
      );
   }

}
