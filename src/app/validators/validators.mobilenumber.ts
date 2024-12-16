import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isValid = /^\d{11}$/.test(value);
    return isValid ? null : { mobileNumberInvalid: true };
  };
}
