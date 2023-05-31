import { Router } from '@angular/router';
import { WebService } from './services/web.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private route: Router) {}
  ngOnInit(): void {}
  title = 'MediCuore';

  active: boolean = true;

  activated(): boolean {
    if (
      this.route.url === '/login' ||
      this.route.url === '/register' ||
      this.route.url === '/'
    ) {
      return (this.active = false);
    } else {
      return (this.active = true);
    }
  }
}
