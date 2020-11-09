import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser$: Observable<any>;
  user:string = "";
  loggedIn:boolean =false;
  query:string = "";
  userId:number = 0;
  img:string = "";

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { 
    this.currentUser$=this.authenticationService.currentUser; 
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(res => {
      var userValue:User = this.authenticationService.currentUserValue;
      if(userValue!=null && userValue!=undefined){
        this.user = userValue.name;
        this.userId = userValue.id;
        this.img = userValue.imageSrc;
        console.log(userValue);
        
        this.loggedIn=true;
      }else{
        this.user = "";
        this.loggedIn=false;
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
