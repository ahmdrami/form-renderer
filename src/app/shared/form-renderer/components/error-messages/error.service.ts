import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ErrorService {
   errors: any[];
   constructor(private http: HttpClient) {
      this.http.get('api/errors').subscribe((errors: any[]) => (this.errors = errors));
   }

   mapErrors(controlErrors: {}, validations: string[]): string[] {
      const arr = [];
      if (controlErrors) {
         // Get all the keys from the control error property then push it to the arr
         Object.keys(controlErrors).forEach(key => {
            let params: any  = validations.find(id => id.split(':')[0].toLowerCase() === key);
            params = params.split(':');
            if (params.lenght === 1) {
               arr.push(this.getErrorMessage(key));
            } else {
               arr.push(this.replaceParams(key, params));
            }
         });
      }
      return arr;
   }

   
   private replaceParams(key: string, params: string[]): string {

      let str: string | any = this.getErrorMessage(key);

      let i = 0;
      while (/%s/.test(str)) {
         str = str.replace('%s', params[(i++) + 1]);
         return str;
      }

      return str;
   }

   private getErrorMessage(key: string): { id, error } {
      const { error } = this.errors.find( ({ id }) =>  id === key);
      return error;
   }
}
