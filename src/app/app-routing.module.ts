import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {ElearningComponent} from './elearning/elearning.component';
import {CoursesComponent} from './courses/courses.component';
import {AddCourseComponent} from './add-course/add-course.component';
import {CourseManagementComponent} from './course-management/course-management.component';
import {UpdateCourseComponent} from './update-course/update-course.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {MyCoursesComponent} from './my-courses/my-courses.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path : "elearning" , component:ElearningComponent,children:
    [
      {path : "home" , component:HomeComponent},
      {path : "mycourses" , component:MyCoursesComponent},
      {path : "courses" , component:CoursesComponent,children:
        [
          {path : "detail/:id" , component:CourseDetailComponent},
        ]
      },
    ]
  },
  {path : "login" , canActivate:[AuthGuard],component:LoginComponent},
  {path : "admin" , component:AdminComponent,children:
    [
      {path : "add" , component:AddCourseComponent},
      {path : "courses" , component:CourseManagementComponent},
      {path : "update/:id" , component:UpdateCourseComponent},
    ]
  },

  {path:'',redirectTo:'login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
