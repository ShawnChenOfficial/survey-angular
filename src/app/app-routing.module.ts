import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminManagementComponent } from './project/admin/components/admin-management/admin-management.component';
import { SurveyLinkComponent } from './project/admin/components/admin-management/sidebar/survey-link/survey-link.component';
import { AdminSurveyItemComponent } from './project/admin/components/admin-management/sidebar/surveys/admin-survey-list/admin-survey-item/admin-survey-item.component';
import { AdminSurveyListComponent } from './project/admin/components/admin-management/sidebar/surveys/admin-survey-list/admin-survey-list.component';
import { LoginComponent } from './project/admin/components/login/login.component';
import { SurveyCompleteComponent } from './project/survey/components/survey-complete/survey-complete.component';
import { SurveyPausedComponent } from './project/survey/components/survey-paused/survey-paused.component';
import { SurveyComponent } from './project/survey/components/survey/survey.component';
import { WelcomeComponent } from './project/welcome/components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'surveys',
    component: SurveyComponent
  },
  {
    path: 'survey-paused',
    component: SurveyPausedComponent
  },
  {
    path: 'survey-complete',
    component: SurveyCompleteComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/management',
    component: AdminManagementComponent,
    children: [{
      path: 'surveys',
      component: AdminSurveyListComponent,
      children: [{
        path: 'detail',
        component: AdminSurveyItemComponent
      }]
    },
    {
      path: 'survey-link',
      component: SurveyLinkComponent
    }]
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
