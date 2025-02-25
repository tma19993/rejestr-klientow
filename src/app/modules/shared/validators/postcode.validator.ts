import { AbstractControl, ValidatorFn } from '@angular/forms';

export function postcodeValidator(): ValidatorFn {
  return (
    control: AbstractControl,
  ): Record<string, { value: string }> | null => {
    const postcodePattern = /^\d{2}-\d{3}$/;
    const value = control.value;
    if (!value || postcodePattern.test(value)) {
      return null;
    }
    return { invalidPostCode: { value } };
  };
}
