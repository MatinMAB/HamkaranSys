import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nationalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isValid = /^\d{10}$/.test(value);
    return isValid ? null : { nationalCodeInvalid: true };
  };
}
