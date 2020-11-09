import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {

  video = {
    title:"",
    description:"",
    src:""
  }

  fileList:FileList = null;

  buttonDisabled = false;

  constructor(private videoService:VideoService, private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    this.fileList = event.target.files;
  }

  submitUpload(){
    this.buttonDisabled = true;

    let formData: FormData = new FormData();

    if (this.fileList.length > 0) {
      let file: File = this.fileList[0];
      formData.append('file', file, file.name);
      this.videoService.uploadVideo(formData).subscribe(
        res => {
          this.video.src = res.src;
          this.addVideo();
        },
        err => { 
          console.log(err);
          this.buttonDisabled = false;
        }
      )
    }
  }

  addVideo(){
    this.videoService.addVideo(this.video).subscribe(
      res => {
        alert("Video upload successful");
        this.router.navigate(['myvideos']);
      },
      err => { 
        console.log(err);
        this.buttonDisabled = false;
      }
    )
  }
}
