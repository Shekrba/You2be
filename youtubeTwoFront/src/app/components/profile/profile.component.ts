import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubService } from 'src/app/services/sub.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile={
    "id":0,
    "username":"",
    "name":"",
    "email":"",
    "numOfSubs":0,
    "videos":[],
    "userImage":"assets/img/user.png"
  }

  currentUser$: Observable<any>;
  userValue = null;

  alreadySubscribed = null;

  constructor(private userService:UserService,private activatedRoute: ActivatedRoute,private authenticationService: AuthenticationService,private subService:SubService) { 
    this.currentUser$=this.authenticationService.currentUser; 
  }

  ngOnInit(): void {

    this.userValue = this.authenticationService.currentUserValue;   

    this.getProfile(this.activatedRoute.snapshot.paramMap.get('id'));

  }

  getProfile(userId){
    this.userService.getProfile(userId).subscribe(
      res => {
        this.profile=res;
        if(this.userValue!=null){
          this.checkIfAlreadySubscribed();
        }
      },
      err => { 
        console.log(err);
      }
    )
  }

  checkIfAlreadySubscribed(){
    this.subService.checkIfAlreadySubscribed(this.profile.id).subscribe(
      res => {
        this.alreadySubscribed = res;
      },
      err => { 
        console.log(err);
      }
    )
  }

  subscribe(){
    this.subService.subscribe(this.profile.id).subscribe(
      res => {
        this.alreadySubscribed=true;
        this.profile.numOfSubs = this.profile.numOfSubs + 1;
      },
      err => { 
        console.log(err);
      }
    )
  }

  unsubscribe(){
    this.subService.unsubscribe(this.profile.id).subscribe(
      res => {
        this.alreadySubscribed=false;
        this.profile.numOfSubs = this.profile.numOfSubs - 1;
      },
      err => { 
        console.log(err);
      }
    )
  }

}
