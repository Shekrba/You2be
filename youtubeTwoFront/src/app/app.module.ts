import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyVideosComponent } from './components/my-videos/my-videos.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { VideoComponent } from './components/video/video.component';
import { VgBufferingModule, VgControlsModule, VgCoreModule, VgOverlayPlayModule } from 'ngx-videogular';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CommentComponent } from './components/comment/comment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { EditVideoComponent } from './components/edit-video/edit-video.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    MyVideosComponent,
    UploadVideoComponent,
    VideoComponent,
    SearchResultsComponent,
    CommentComponent,
    ProfileComponent,
    SubscriptionsComponent,
    EditVideoComponent,
    EditProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
