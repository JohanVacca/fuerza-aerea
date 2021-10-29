import { Component, OnInit,Inject } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  
  constructor() {
    //  analytics: AnalyticsService
  }

  ngOnInit(): void {
  }
}
