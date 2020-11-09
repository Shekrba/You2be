import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SearchService } from 'src/app/services/search.service';
import { SubService } from 'src/app/services/sub.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  videos=[];
  channels=[];
  currentUser$: Observable<any>;
  userValue = null;

  constructor(private searchService:SearchService, private activatedRoute: ActivatedRoute,private authenticationService: AuthenticationService,private subService:SubService) {
    this.currentUser$=this.authenticationService.currentUser; 
   }

  ngOnInit(): void {
    
    this.userValue = this.authenticationService.currentUserValue;   

    this.activatedRoute.params.subscribe(routeParams => {
      this.search(this.activatedRoute.snapshot.paramMap.get('query'));
    });
  }

  search(query){
    this.searchService.searchVideosAndChannels(query).subscribe(
      res => {
        console.log(res);
        this.videos = res.videos;
        this.channels = res.channels;
        if(this.userValue!=null){
          this.checkIfAlreadySubscribed(this.channels);
        }
      },
      err => { 
        console.log(err);
      }
    )
  }

  checkIfAlreadySubscribed(user){
    this.subService.checkIfAlreadySubscribedGroup(user).subscribe(
      res => {
        this.channels = res;
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
      },
      err => { 
        console.log(err);
      }
    )
  }
}
