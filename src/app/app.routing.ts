import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../app/login/login.component';
import { DesignedHomeComponent } from './designed-home/designed-home.component';
import { NoteComponent } from './note/note.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FullProfileComponent } from './full-profile/full-profile.component';
import { StudentsComponent } from './students/students.component';
import { AuthGuard } from './_services/auth.guard';
import { ProfileGuard } from './_services/profile.guard';
import { TeacherGuard } from './_services/teacher.guard';

const routes: Routes = [
  { path: '', component: DesignedHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'note/:id', component: NoteComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, ProfileGuard] },
  { path: 'register', component: SignUpComponent, canActivate: [AuthGuard, ProfileGuard] },
  { path: 'fullprofile/:id', component: FullProfileComponent, canActivate: [AuthGuard, ProfileGuard] },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard, TeacherGuard] },
];

export const appRoutingModule = RouterModule.forRoot(routes);
