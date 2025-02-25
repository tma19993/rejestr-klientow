import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  private sub!: Subscription;
  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.sub = this.authService.user.subscribe({
      next: (value) => {
        this.user = value;
      },
    });
  }
  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  public logout(): void {
    this.authService.logout();
  }
}
