import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditVideoComponent } from './components/edit-video/edit-video.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyVideosComponent } from './components/my-videos/my-videos.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { VideoComponent } from './components/video/video.component';
import { AuthGuard } from './guard';

const routes: Routes = [
  { path : "", component : HomeComponent },
  { path : "register", component : RegisterComponent },
  { path : "login", component : LoginComponent },
  { path : "myvideos", component : MyVideosComponent, canActivate:[AuthGuard] },
  { path : "uploadvideo", component : UploadVideoComponent, canActivate:[AuthGuard] },
  { path : "video/:id", component : VideoComponent },
  { path : "results/:query", component : SearchResultsComponent },
  { path : "profile/:id", component : ProfileComponent },
  { path : "subscriptions", component : SubscriptionsComponent, canActivate:[AuthGuard] },
  { path : "editvideo/:id", component : EditVideoComponent, canActivate:[AuthGuard] },
  { path : "editprofile", component : EditProfileComponent, canActivate:[AuthGuard] },
  { path : "changepassword", component : ChangePasswordComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
