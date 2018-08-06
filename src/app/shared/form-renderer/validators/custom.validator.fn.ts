import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomValidatorService } from './custom-validator.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';

export class CustomValidateFn {
   static createValidator(service: CustomValidatorService, endpoint, query, id) {
      return (control: AbstractControl): Observable<ValidationErrors> => {
         return timer(400).pipe(
            switchMap(() =>
               service.check(endpoint, query, control.value).pipe(map((resp: any) => (resp.length > 0 ? { [id]: true } : null)))
            )
         );
      };
   }
}
