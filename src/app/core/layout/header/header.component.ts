import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForme: EventEmitter<void> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.toggleSidebarForme.emit();
  }
}
