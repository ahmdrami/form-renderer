import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { FormModel } from './form-renderer/form-renderer/form-schema';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable()
export class FormService {
   endpoint = 'api/';
   constructor(private http: HttpClient) {}

   getConfig(): Observable<FormModel[]> {
      return this.http.get<FormModel[]>(`${this.endpoint}config`);
   }

   getFormData(): Observable<any> {
      return this.http.get(`${this.endpoint}formData`);
   }
}
