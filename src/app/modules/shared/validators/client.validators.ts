import { ValidatorFn } from '@angular/forms';
import { postcodeValidator } from './postcode.validator';

export class ClientsValidators {
  public static postcode(): ValidatorFn {
    return postcodeValidator();
  }
}
