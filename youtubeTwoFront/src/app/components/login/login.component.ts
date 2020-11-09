import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/login-user';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:LoginUser = new LoginUser();

  constructor(private authService:AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  public submitLogin(){
    console.log(this.user);

    if(this.user.username!=null || this.user.password!=null)

    this.authService.login(this.user.username, this.user.password)
      .pipe(first())
      .subscribe(
          data => {
            this.router.navigate(['']);
          },
          error => {
            console.log(error);
        });

  }

}
