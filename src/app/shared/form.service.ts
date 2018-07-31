import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FieldModel, DynamicOptionModel, SectionModel } from './form-renderer/form-renderer/form-schema';
import { HttpClient } from '@angular/common/http';
import { setValidators } from './form-renderer/set.validator';
import { map } from '../../../node_modules/rxjs/operators';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Injectable()
export class FormService {
   endpoint = 'api/';
   group = new FormGroup({});
   constructor(private http: HttpClient) {}

   getConfig(): Observable<FieldModel[] | SectionModel[]> {
      return this.http.get<FieldModel[] | SectionModel[]>(`${this.endpoint}screen`).pipe(setValidators());
   }

   getFormData(): Observable<any> {
      return this.http.get(`${this.endpoint}formData`);
   }

   getOptionsData(query: string): Observable<any> {
      return this.http.get(`${this.endpoint}${query}`).pipe(
         map((options: DynamicOptionModel[]) => options[0])
      );
   }

   createGroup(config: any, formData: FieldModel): FormGroup {
      
      config.forEach(control => {
         if (control.fields) {
            return this.createGroup(control.fields, formData);
         }
         this.group.addControl(control.id, this.createControl(control, formData));

      });
      
      return this.group;
   }

   createControl(config: FieldModel, formData: FieldModel): FormControl | FormArray {
      return (config.type === 'checkbox') ? this.multiControl(config, formData) : this.singleControl(config, formData);
   }

   
   private singleControl(config: FieldModel, formData: FieldModel): FormControl {
      return new FormControl(formData[config.id], config.validatorFns);
   }

   private multiControl(config: FieldModel, formData: FieldModel): FormArray {
      const savedOptions: string[] = formData[config.id];
      const arr = config.options.map(option => { 
         option.checked = savedOptions.indexOf(option.value) > -1 ? true : false; 
         return new FormControl(option.checked); 
      });
      return new FormArray(arr, config.validatorFns);
   }


   


}
