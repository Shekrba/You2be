import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allVideos = [];

  constructor(private router: Router, private videoService:VideoService) {
    
  }

  ngOnInit(): void {
  
      this.getAllVideos();
  
  }

  getAllVideos(){
    this.videoService.getAllVideos().subscribe(
      res => {
        console.log(res);
        
        this.allVideos = res;
      },
      err => { 
        console.log(err);
      }
    );
  }

}
