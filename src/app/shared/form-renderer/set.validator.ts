import { OperatorFunction } from 'rxjs/interfaces';
import { Observable } from 'rxjs/Observable';
import { Validators } from '@angular/forms';

export function setValidators<T>(): OperatorFunction<T, T> {
   return function(source$: Observable<T>): Observable<T> {
      return new Observable<T>(observer => {
         const wrapper = {
            next: value => {
               value
               .filter( ({ validations }) => validations)
               .forEach(config => (config.validations = mapValidators(config.validations)));
               observer.next(value);
            },
            error: observer.error
         };

         return source$.subscribe(wrapper);
      });
   };
}

function mapValidators(validators: string[]): Validators[] {
   const validations: Validators[] = [];
   validators.forEach(validator => {
      validations.push(Validators[validator]);
   });
   return validations;
}
