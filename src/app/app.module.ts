﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { appRoutingModule } from './app.routing';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './_services/auth.guard';
import { DesignedHomeComponent } from './designed-home/designed-home.component';
import { NoteComponent } from './note/note.component';
import { MasterDetailModule } from './master-detail/master-detail.module';
import { DetailComponent } from './master-detail/detail.component';
import { ProfileComponent } from './profile/profile.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { ProfileGuard } from './_services/profile.guard';
import { UsersComponent } from './users/users.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FullProfileComponent } from './full-profile/full-profile.component';
import { StudentsComponent } from './students/students.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
	LoginComponent,
    AlertComponent,
	HeaderComponent,
    FooterComponent,
    DesignedHomeComponent,
    NoteComponent,
    DetailComponent,
    ProfileComponent,
    LeftmenuComponent,
    UsersComponent,
    SignUpComponent,
    FullProfileComponent,
    NotificationComponent,
	StudentsComponent,
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    ReactiveFormsModule,
    appRoutingModule,
	BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
	ToastrModule.forRoot(),
    FormsModule,
    MasterDetailModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
