import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideBarOpen: boolean = false;
  sideBarToggler(): void {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
