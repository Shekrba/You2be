import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  currentUser$: Observable<any>;
  user = {
    "id":0,
    "username":"",
    "name":"",
    "email":""
  }
  fileList:FileList = null;


  constructor(private authenticationService: AuthenticationService,private userService:UserService,private router: Router) {
    this.currentUser$=this.authenticationService.currentUser; 
   }

  ngOnInit(): void {

    this.currentUser$.subscribe(res => {
      var userValue:User = this.authenticationService.currentUserValue;

      this.user.id = userValue.id;
      this.user.username = userValue.username;
      this.user.name = userValue.name;
      this.user.email = userValue.email;
    });
  }  

  submit(){
    this.userService.editProfile(this.user).subscribe(
      res => {
        this.router.navigate(['']);
      },
      err => { 
        console.log(err);
      }
    )
  }
}
