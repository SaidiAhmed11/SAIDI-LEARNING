import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { ElearningComponent } from './elearning/elearning.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import {AuthGuard} from './auth.guard';
import { ParticipantsComponent } from './participants/participants.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    ElearningComponent,
    CoursesComponent,
    CourseComponent,
    CourseDetailComponent,
    AddCourseComponent,
    CourseManagementComponent,
    UpdateCourseComponent,
    MyCoursesComponent,
    ParticipantsComponent,
    HomeAdminComponent,
    ProfileComponent,
    SignupComponent,
    NotFoundComponent,
    PricingComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
