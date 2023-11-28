import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styles: ''
})
export class HeaderComponent {
  constructor(private authSvc: AuthService) {

  }
  onTrigger1Clicked() {
    this.authSvc.fakeUserAuth();
  }

  onTrigger2Clicked() {
    this.authSvc.fakeUserBackgroundLogin();
  }

  evenMoreUserData$ = this.authSvc.evenMoreUserData$; 
}
