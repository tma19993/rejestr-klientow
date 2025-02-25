import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { PostUser } from '../../../core/models/user.model';
import { Router } from '@angular/router';
import { FormsService } from '../../../core/services/forms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public hide = true;
  public registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(50),
      ],
      nonNullable: true,
    }),
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    // hobbies: new FormArray([new FormControl('')]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private formService: FormsService,
  ) {}

  public get controls() {
    return this.registerForm.controls;
  }

  // public get hobbies() {
  //   return this.registerForm.get('hobbies') as FormArray;
  // }

  // public addControl(): void {
  //   this.hobbies.push(new FormControl(''));
  // }

  // public removeControl(index: number): void {
  //   this.hobbies.removeAt(index);
  // }

  public ngOnInit(): void {
    // this.registerForm.controls.email.valueChanges.subscribe((text) => {
    //   console.log(text);
    // });
    console.log('');
    // this.registerForm.controls.email.hasError('email');
    // this.controls.username.addValidators(Validators.minLength(5));
    // this.controls.username.setValidators([
    //   Validators.minLength(5),
    //   Validators.required,
    // ]);
    // this.registerForm.controls.email.disable();
    // this.controls.username.setValue()
    this.registerForm.patchValue({
      email: 'test@ad',
    });
    // this.registerForm.setValue({
    //   email: 'test@ad',
    //   username: '',
    //   password: '',
    // });
  }

  public getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }

  // public enableControl(): void {
  //   this.registerForm.controls.email.enable();
  // }

  public onRegister(): void {
    const userData: PostUser = this.registerForm.getRawValue();
    console.log(this.registerForm.value);
    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/logowanie']);
      },
      error: (err) => {
        console.log(err);
      },
    });
    // console.log(this.registerForm.value);
    // console.log(this.registerForm.getRawValue());
  }
}
