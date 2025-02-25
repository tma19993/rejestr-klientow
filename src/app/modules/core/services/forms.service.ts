import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor() {}

  public getErrorMessage(control: FormControl): string {
    // switch (true) {
    //   case control.hasError('required'):
    //     return 'Musisz wpisać jakąś wartość ';
    //     break;
    //   case control.hasError('minlength'):
    //     return 'Za mało znaków ';
    //     break;
    //   case control.hasError('maxlength'):
    //     return 'Za dużo znaków';
    //     break;
    //   case control.hasError('email'):
    //     return 'Nieprawidłowy adres e-mail';
    //     break;
    //   default:
    //     return '';
    // }
    if (control.hasError('required')) {
      return 'Musisz wpisać jakąś wartość ';
    }
    if (control.hasError('minlength')) {
      return 'Za mało znaków ';
    }
    if (control.hasError('maxlength')) {
      return 'Za dużo znaków';
    }
    if (control.hasError('invalidPostCode')) {
      return 'Kod pocztowy powinien być w formacie xx-xxx';
    }
    return control.hasError('email') ? 'Nieprawidłowy adres e-mail' : '';
  }
}
