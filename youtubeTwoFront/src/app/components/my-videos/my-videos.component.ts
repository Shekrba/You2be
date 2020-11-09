import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss']
})
export class MyVideosComponent implements OnInit {

  myVideos=[];

  constructor(private videoService:VideoService) { }

  ngOnInit(): void {
    this.getMyVideos();
  }

  getMyVideos(){
    this.videoService.getMyVideos().subscribe(
      res => {
        this.myVideos = res;
      },
      err => { 
        console.log(err);
      }
    );
  }

}
