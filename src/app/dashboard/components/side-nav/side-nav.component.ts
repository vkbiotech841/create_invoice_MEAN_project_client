import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';



@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  links = [
    { name: 'Invoices', url: 'invoices' },
    { name: 'Clients', url: 'clients' },

  ]



  constructor() {


  }

  ngOnInit() {
  }

  ///////////////////// Media query using javascript ////////////////////////////////
  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.configureSideNav()
  };

  smallScreen: boolean;
  sideNavMode: string;
  sideNavOpened: boolean;
  maxWindowScreenSize = 775;

  configureSideNav() {
    this.smallScreen = window.innerWidth < this.maxWindowScreenSize ? true : false
    if (!this.smallScreen) {
      this.sideNavMode = "side"
      this.sideNavOpened = true
    } else {
      this.sideNavMode = 'over'
      this.sideNavOpened = false
    }
  };
  //////////////////////////////////////////////////////////////////////////////


}
