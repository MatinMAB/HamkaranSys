import { Component } from '@angular/core';
import { HttprequestService } from '../services/httprequest.service';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-allusers',
  imports: [RouterModule],
  templateUrl: './allusers.component.html',
  styleUrl: './allusers.component.scss',
})
export class AllusersComponent {
  constructor(
    private request: HttprequestService,
    private authService: AuthService
  ) {}

  users: any[] = [];
  errorMessage: string = '';
  currentUserRole!: string;

  ngOnInit(): void {
    this.request.getUsers().subscribe({
      next: (users) => {
        this.users = Object.values(users);
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });

    this.request.getUser().subscribe((user) => {
      this.authService.setCurrentUser(user);
      this.currentUserRole = this.authService.getRole();
    });
  }
}
