import { OperatorFunction } from 'rxjs/interfaces';
import { Observable } from 'rxjs/Observable';
import { Validators, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { FieldValidationModel } from '../form-renderer/form-schema';
import { CustomValidatorService } from './custom-validator.service';
import { CustomValidateFn } from './custom.validator.fn';

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

function hasValidations(config: any): boolean {
   if (config.fields) {
      config.fields.forEach(f => hasValidations(f));
   }
   if (config.validations) {
      config.validatorFns = mapNativeValidators(config.validations.filter(({ type }) => type === 'native'));
   }
   return true;
}

export function mapAsyncValidators(asyncValidators: FieldValidationModel[], service: CustomValidatorService): AsyncValidatorFn {
   const validations: AsyncValidatorFn[] = [];

   asyncValidators.forEach((validator: FieldValidationModel) => {
      validations.push(CustomValidateFn.createValidator(service, validator.validationUrl, validator.query, validator.id));
   });

   return Validators.composeAsync(validations);
}
function mapNativeValidators(nativeValidators: FieldValidationModel[]): ValidatorFn {
   const validations: ValidatorFn[] = [];
   nativeValidators.forEach((validator: FieldValidationModel) => {
      const { id, arg } = validator;
      arg
         ? // If the value exists then the validator has an argument to take e.g. maxLength(25)
           validations.push(Validators[id](arg))
         : // Otherwise push the validator to the array e.g. required, email
           validations.push(Validators[id]);
   });
   // A validator function that returns a map of error validators.
   return Validators.compose(validations);
}
