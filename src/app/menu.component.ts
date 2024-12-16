import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttprequestService } from './services/httprequest.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(
    private request: HttprequestService,
    private authService: AuthService
  ) {}

  errorMessage: string = '';

  ngOnInit(): void {
    this.request.getUser().subscribe((user) => {
      this.authService.setCurrentUser(user);
      console.log(this.authService.getCurrentUser());

    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  get currentUser(): any {
    return this.authService.getCurrentUser();
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
