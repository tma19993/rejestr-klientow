import { Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-phone-control',
  templateUrl: './phone-control.component.html',
  styleUrl: './phone-control.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneControlComponent,
      multi: true,
    },
  ],
})
export class PhoneControlComponent implements ControlValueAccessor, OnDestroy {
  public numberPrefixControl = new FormControl('', [Validators.required]);
  public numberControl = new FormControl('', [Validators.required]);
  public sub: Subscription = new Subscription();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public onChange = (value: string | null) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouch = () => {};

  constructor() {
    this.sub.add(
      combineLatest([
        this.numberPrefixControl.valueChanges,
        this.numberControl.valueChanges,
      ]).subscribe(([prefix, number]) => {
        if (prefix && number) {
          this.onChange(`+${prefix}${number}`);
        } else {
          this.onChange(null);
        }
      }),
    );
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  writeValue(value: string): void {
    const valueWithoutPlus = value.replace('+', '');
    const prefix = valueWithoutPlus.slice(0, 2);
    const number = valueWithoutPlus.slice(2);
    this.numberPrefixControl.setValue(prefix);
    this.numberControl.setValue(number);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.numberControl.disable();
      this.numberPrefixControl.disable();
    } else {
      this.numberControl.enable();
      this.numberPrefixControl.enable();
    }
  }
}
