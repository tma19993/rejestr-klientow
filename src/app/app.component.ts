import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'rejestr-klientow';
  constructor(private authService: AuthService) {}
  public ngOnInit(): void {
    this.authService.autoLogin();
  }
}
