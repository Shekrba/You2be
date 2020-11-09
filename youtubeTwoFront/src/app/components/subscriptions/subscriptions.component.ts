import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubService } from 'src/app/services/sub.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  mySubscriptions=[];
  channelSubs=[];
  currentUser$: Observable<any>;
  userValue=null;

  constructor(private subService:SubService,private authenticationService: AuthenticationService) {
    this.currentUser$=this.authenticationService.currentUser; 
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(res => {
      this.userValue = this.authenticationService.currentUserValue;

      if(this.userValue!=null && this.userValue!=undefined){              
        this.getSubs();
      }
    });
  }

  getSubs(){
    this.subService.getSubscriptions().subscribe(
      res => {
        console.log(res);
        
        this.mySubscriptions = res.mySubscriptions;
        this.channelSubs = res.channelSubs;
      },
      err => { 
        console.log(err);
      }
    )
  }

  subscribe(channel){
    this.subService.subscribe(channel.id).subscribe(
      res => {
        channel.alreadySubscribed=true;
        channel.numOfSubs = channel.numOfSubs + 1;
        this.mySubscriptions.push(channel);
      },
      err => { 
        console.log(err);
      }
    )
  }

  unsubscribe(channel){
    this.subService.unsubscribe(channel.id).subscribe(
      res => {
        channel.alreadySubscribed=false;
        channel.numOfSubs = channel.numOfSubs - 1;

        for(let i=0;i<this.mySubscriptions.length;i++){
          if(this.mySubscriptions[i].id == channel.id){
            this.mySubscriptions.splice(i,1);
            break;
          }
        }
      },
      err => { 
        console.log(err);
      }
    )
  }

}
