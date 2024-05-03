import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  showSpinner: boolean = false;

  constructor(router: Router, spinner: NgxSpinnerService) {
    spinner.show();
    router.events.subscribe(() => {
      if (router instanceof RouteConfigLoadStart) {
        this.showSpinner = true;
      }
      if (router instanceof RouteConfigLoadEnd) {
        this.showSpinner = false;
      }
    });
  }
}
