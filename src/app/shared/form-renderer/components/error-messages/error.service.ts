import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ErrorService {
   errors: any[];
   constructor(private http: HttpClient) {
      this.http.get('api/errors').subscribe((errors: any[]) => (this.errors = errors));
   }

   mapErrors(controlErrors: {}): string[] {
      const arr = [];
      let errorKeys;
      if (controlErrors) {
         // Get all the keys from the control error property then push it to the arr
         errorKeys = Object.keys(controlErrors);
         this.errors.filter(({ id }) => errorKeys.indexOf(id) > -1).forEach(({ error }) => arr.push(this.replaceParams(error, ['25'])));
      }
      return arr;
   }

   private replaceParams(errorMessage: string, ...args): string {
      let str = errorMessage,
         i = 0;
      while (/%s/.test(str)) {
         str = str.replace('%s', args[i++]);
         return str;
      }

      return str;
   }
}
