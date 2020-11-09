import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private videoService:VideoService,private router: Router) { }

  video={
    "title":"",
    "description":"",
    "id":0
  }

  ngOnInit(): void {
  
    this.getVideo(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getVideo(videoId){
    this.videoService.getVideo(videoId).subscribe(
      res => {
        this.video.title=res.title;
        this.video.description=res.description;
        this.video.id = res.id;
      },
      err => { 
        console.log(err);
      }
    )
  }

  submit(){
    this.videoService.editVideo(this.video).subscribe(
      res => {
        this.router.navigate(['']);
      },
      err => { 
        console.log(err);
      }
    )
  }

  
}
