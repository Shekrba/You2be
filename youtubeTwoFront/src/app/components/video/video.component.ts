import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentService } from 'src/app/services/comment.service';
import { LikingService } from 'src/app/services/liking.service';
import { SubService } from 'src/app/services/sub.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  video = {
    id:null,
    title:"",
    description:"",
    views:0,
    uploadDate:"",
    src:"",
    numOfComments:0,
    likes:0,
    dislikes:0,
    numOfSubscribers:0,
    uploaderId:0,
    uploaderUsername:"",
    userImage:"assets/img/user.png"
  }

  currentUser$: Observable<any>;
  alreadySubscribed=null;
  likesVideo=false;
  dislikesVideo=false;
  userValue:User=null;
  comments=[];
  newCommentText="";

  constructor(private videoService:VideoService,
     private activatedRoute: ActivatedRoute,
     private subService:SubService,
     private authenticationService: AuthenticationService,
     private likingService:LikingService,
     private commentService:CommentService,
     private router: Router) { 

    this.currentUser$=this.authenticationService.currentUser; 
  }

  ngOnInit(): void {
  
    this.getVideo(this.activatedRoute.snapshot.paramMap.get('id'));
  
  }

  getVideo(videoId){
    this.videoService.getVideo(videoId).subscribe(
      res => {
        console.log(res);
        
        this.video = res;

        this.getComments(this.video.id);

        this.currentUser$.subscribe(res => {
          this.userValue = this.authenticationService.currentUserValue;
          if(this.userValue!=null && this.userValue!=undefined){
            console.log(this.userValue);
            
            this.checkIfAlreadySubscribed();
            this.checkLiking();
          }
        });
      },
      err => { 
        console.log(err);
      }
    )
  }

  checkIfAlreadySubscribed(){
    this.subService.checkIfAlreadySubscribed(this.video.uploaderId).subscribe(
      res => {
        console.log(res);
        this.alreadySubscribed = res;
      },
      err => { 
        console.log(err);
      }
    )
  }

  checkLiking(){
    this.likingService.checkLiking(this.video.id).subscribe(
      res => {
        console.log(res);
        if(res.value=="LIKE"){
          this.likesVideo=true;
        }
        else if(res.value=="DISLIKE"){
          this.dislikesVideo=true;
        }
      },
      err => { 
        console.log(err);
      }
    )
  }

  subscribe(){
    this.subService.subscribe(this.video.uploaderId).subscribe(
      res => {
        this.alreadySubscribed=true;
        this.video.numOfSubscribers = this.video.numOfSubscribers + 1;
      },
      err => { 
        console.log(err);
      }
    )
  }

  unsubscribe(){
    this.subService.unsubscribe(this.video.uploaderId).subscribe(
      res => {
        this.alreadySubscribed=false;
        this.video.numOfSubscribers = this.video.numOfSubscribers - 1;
      },
      err => { 
        console.log(err);
      }
    )
  }

  makeLiking(value){

    var body={
      'value':value,
      'videoId':this.video.id
    };

    this.likingService.makeLiking(body).subscribe(
      res => {
        if(value=="LIKE"){
          this.likesVideo=true;
          this.video.likes = this.video.likes + 1;

          if(this.dislikesVideo==true){
            this.dislikesVideo=false;
            this.video.dislikes = this.video.dislikes - 1;
          }        
        }
        else if(value=="DISLIKE"){
          this.dislikesVideo=true;
          this.video.dislikes = this.video.dislikes + 1;

          if(this.likesVideo==true){
            this.likesVideo=false;
            this.video.likes = this.video.likes - 1;
          }   
        }
      },
      err => { 
        console.log(err);
      }
    )
  }

  deleteLiking(value){

    var userValue:User = this.authenticationService.currentUserValue;
    if(userValue!=null && userValue!=undefined){
      this.likingService.deleteLiking(this.video.id).subscribe(
        res => {
          if(value=="LIKE"){
            this.likesVideo = false;
            this.video.likes = this.video.likes - 1;
          }
          else if(value=="DISLIKE"){
            this.dislikesVideo = false;
            this.video.dislikes = this.video.dislikes - 1;
          }
        },
        err => { 
          console.log(err);
        }
      )
    }
  }

  getComments(videoId){
    this.commentService.getTopLevelComments(videoId).subscribe(
      res => {
        this.comments = res
      },
      err => { 
        console.log(err);
      }
    )
  }

  addComment(){
    var newComment = {
      "text":this.newCommentText,
      "videoId":this.video.id,
      "parentId":0
    }

    this.commentService.addComment(newComment).subscribe(
      res => {
        this.comments.push(res);
        this.newCommentText="";
      },
      err => { 
        console.log(err);
      }
    )
  }

  deleteVideo(){
    this.videoService.deleteVideo(this.video.id).subscribe(
      res => {
        this.router.navigate(['myvideos']);
      },
      err => { 
        console.log(err);
      }
    )
  }

  handleDeleteCommentEvent(deletedComment:any):void{
    
    for(let i =0;i<this.comments.length;i++){
      if(this.comments[i].id == deletedComment.id) {
        this.comments.splice(i, 1);
        break;
      }
    }
  }
}
