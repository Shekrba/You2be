import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment;
  @Input() userValue;
  @Output() deleteCommentEmmiter: EventEmitter<any> = new EventEmitter<any>();

  replies=[];
  shouldGetData=true;
  newCommentText="";

  constructor(private commentService:CommentService) { }

  ngOnInit(): void {
  }

  getChildren(){

    if(this.shouldGetData==false){
      return;
    }

    this.shouldGetData = false;

    this.commentService.getReplies(this.comment.id).subscribe(
      res => {
        this.replies = res
      },
      err => { 
        console.log(err);
      }
    )
  }

  addComment(){
    var newComment = {
      "text":this.newCommentText,
      "videoId":this.comment.videoId,
      "parentId":this.comment.id
    }

    this.commentService.addComment(newComment).subscribe(
      res => {
        this.replies.push(res);
        this.comment.numOfReplies = this.comment.numOfReplies + 1;
        this.newCommentText="";
      },
      err => { 
        console.log(err);
      }
    )
  }
  

  handleDeleteCommentEvent(deletedComment){
    
    for(let i =0;i<this.replies.length;i++){
      if(this.replies[i].id == deletedComment.id) {
        this.replies.splice(i, 1);
        break;
      }
    }
  }

  deleteComment(){

    this.commentService.deleteComment(this.comment.id).subscribe(
      res => {
        this.deleteCommentEmmiter.emit(this.comment);
      },
      err => { 
        console.log(err);
      }
    )
  }
}
