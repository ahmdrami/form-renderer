import { OperatorFunction } from 'rxjs/interfaces';
import { Observable } from 'rxjs/Observable';
import { Validators, ValidatorFn } from '@angular/forms';
import { FormModel } from './form-renderer/form-schema';

export function setValidators<T>(): OperatorFunction<T, T> {
   return function(source$: Observable<T>): Observable<T> {
      return new Observable<T>(observer => {
         const wrapper = {
            next: value => {
               value.forEach(config => hasValidations(config));
               observer.next(value);
            },
            error: observer.error
         };

         return source$.subscribe(wrapper);
      });
   };
}

function hasValidations(field: FormModel): boolean {
   if (field.fields) {
      field.fields.forEach(f => hasValidations(f));
   }
   if (field.validations) {
      field.validatorFns = mapValidators(field.validations);
   }
   return true;
}
function mapValidators(validators: string[]): ValidatorFn {
   const validations: ValidatorFn[] = [];
   validators.forEach(validator => {
      // Validations can be stored in an array as "require", "maxLength:25"
      // Split it using the colon symbol
      const splitValidator = validator.split(':');

      splitValidator.length === 1
         ? // If the length is 1 then we have a Validator that does not rely on a parameter e.g. required, email
           validations.push(Validators[splitValidator[0]])
         : // If the length is 2 then pass the second child as an argument to the Validator
           validations.push(Validators[splitValidator[0]](splitValidator[1]));
   });
   // A validator function that returns a map of error validators.
   // There is a composeAsync function that can be considererd when validation using a service call
   return Validators.compose(validations);
}
