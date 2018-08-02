import { AbstractControl } from '@angular/forms';
import { CustomValidatorService } from './custom-validator.service';
import { of } from 'rxjs';
import { map, switchMap, tap, debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

export class CustomValidateFn {
   static createValidator(service: CustomValidatorService, endpoint, query, id) {
      const observer = of({});
      return (control: AbstractControl) => {
         console.log(control.value);
         return new Promise(resolve => {
            observer.pipe(
               debounceTime(1000),
               distinctUntilChanged(),
               switchMap(() => service.check(endpoint, query, control.value))
            
            ).subscribe((resp: any) => 
               (resp.length > 0) ? resolve({ [id]: true }) : resolve(null)
               
            );
         });
      };
   }
}
