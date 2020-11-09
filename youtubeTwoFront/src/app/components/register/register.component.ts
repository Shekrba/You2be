import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegUser } from 'src/app/model/reg-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user:RegUser = new RegUser();
  fileList:FileList = null;

  constructor(private authService:AuthenticationService, private router: Router,private userService:UserService) { }

  ngOnInit(): void {
  }

  public submitRegistration(){
    console.log(this.user);

    this.authService.submitRegistration(this.user).subscribe(
      res => {
        alert(res.message);
        this.router.navigate(['']);
      },
      err => { 
        console.log(err);
      }
    )

  }

  onFileSelected(event){
    this.fileList = event.target.files;
  }

  submitUpload(){
    let formData: FormData = new FormData();

    if (this.fileList.length > 0) {
      let file: File = this.fileList[0];
      formData.append('file', file, file.name);
      this.userService.upload(formData).subscribe(
        res => {
          this.user.imageSrc = res.src;
          this.submitRegistration();
        },
        err => { 
          console.log(err);
        }
      )
    }
  }
}
