import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {User} from '../_models';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();
  @Output() toggleTheme =  new EventEmitter<void>();
  @Output() toggleRtl =  new EventEmitter<void>();
  @Input() currentUser: User;
  // god mode defs
  // citiesLists: CitiesList[];
  // superpowersLists: SuperPowersList[];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {

  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
  isStaff(): boolean{
    if(!this.currentUser) return false;
    if(this.currentUser.is_staff) return true;
    return false;
  }

}
