import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eduxy';
  constructor(private bnIdle: BnNgIdleService,private router: Router) {
  }
  // initiate it in your component OnInit
  ngOnInit(): void {
    //60 = 1 minute
    this.bnIdle.startWatching(120).subscribe((res) => {
      if (res) {
        console.log('session expired');
        sessionStorage.clear(); 
        this.router.navigateByUrl('');
      }
    });
  }
}
