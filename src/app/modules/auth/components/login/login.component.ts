import { Component } from '@angular/core';
import { UserLoginData } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public hide = true;
  public userData: UserLoginData = {
    username: '',
    password: '',
  };
  public errorMessage = '';

  constructor(private authService: AuthService) {}
  public onLogin(): void {
    this.authService.login(this.userData).subscribe({
      next: (value) => {
        console.log(value);
        if (value.length == 0) {
          this.errorMessage = 'Podano nieprawidłowe dane do logowania';
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Wystąpił błąd';
      },
    });
  }
}
