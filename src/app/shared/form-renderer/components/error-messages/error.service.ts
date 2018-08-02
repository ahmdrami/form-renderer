import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FieldValidationModel } from '../../form-renderer/form-schema';
@Injectable()
export class ErrorService {
   errors: any[];
   constructor(private http: HttpClient) {
      this.http.get('api/errors').subscribe((errors: any[]) => (this.errors = errors));
   }

   mapErrors(controlErrors: {}, validations: FieldValidationModel[]): string[] {
      const arr = [];
      if (controlErrors) {
         console.log(controlErrors, 'control errors');
         // Get all the keys from the control error property then push it to the arr
         Object.keys(controlErrors).forEach(key => {
            const { feedbackParams } = validations.find( ({ id }) => id.toLowerCase() === key.toLowerCase());
            if (feedbackParams) {
               arr.push(this.replaceParams(key, feedbackParams));
            } else {
               arr.push(this.getErrorMessage(key));
            }
         });
      }
      return arr;
   }

   
   private replaceParams(key: string, params: string[]): string {

      let str: string | any = this.getErrorMessage(key);
      let i = 0;
      while (/%s/.test(str)) {
         str = str.replace('%s', params[(i++)]);
         return str;
      }

      return str;
   }

   private getErrorMessage(key: string): string {
      const { error } = this.errors.find( ({ id }) =>  id.toLowerCase() === key.toLowerCase());
      return error;
   }
}
