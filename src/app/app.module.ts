import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { ToolsModule } from 'tools';
import { AuthModule } from 'auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './project/welcome/components/welcome/welcome.component';
import { SurveyComponent } from './project/survey/components/survey/survey.component';
import { NavComponent } from './project/nav/components/nav/nav.component';
import { SurveyQuestionComponent } from './project/survey/components/survey-question/survey-question.component';
import { environment } from 'src/environments/environment';
import { SurveyService } from './project/survey/services/survey.service';
import { HttpClientModule } from '@angular/common/http';
import { SurveyHttpService } from './project/survey/services/survey.http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionMultiSelectComponent } from './project/survey/components/survey-question/question-multi-select/question-multi-select.component';
import { QuestionSingleSelectComponent } from './project/survey/components/survey-question/question-single-select/question-single-select.component';
import { LoginComponent } from './project/admin/components/login/login.component';
import { AdminManagementComponent } from './project/admin/components/admin-management/admin-management.component';
import { SidebarComponent } from './project/admin/components/admin-management/sidebar/sidebar.component';
import { AdminSurveyListComponent } from './project/admin/components/admin-management/sidebar/surveys/admin-survey-list/admin-survey-list.component';
import { AdminSurveyItemComponent } from './project/admin/components/admin-management/sidebar/surveys/admin-survey-list/admin-survey-item/admin-survey-item.component';
import { ModalContentComponent } from './project/modal/components/modal-content/modal-content.component';
import { ModalDirective } from './project/modal/directives/modal.directive';
import { ModalFooterComponent } from './project/modal/components/modal-content/modal-footer/modal-footer.component';
import { ModalHeaderComponent } from './project/modal/components/modal-content/modal-header/modal-header.component';
import { SurveyItemDetailModalComponent } from './project/admin/components/admin-management/sidebar/surveys/admin-survey-list/admin-survey-item/survey-item-detail-modal/survey-item-detail-modal.component';
import { SurveyModalComponent } from './project/admin/components/admin-management/sidebar/surveys/admin-survey-list/survey-modal/survey-modal.component';
import { SurveyRemoveModalComponent } from './project/admin/components/admin-management/sidebar/surveys/admin-survey-list/survey-remove-modal/survey-remove-modal.component';
import { SurveyItemRemoveModalComponent } from './project/admin/components/admin-management/sidebar/surveys/admin-survey-list/admin-survey-item/survey-item-remove-modal/survey-item-remove-modal.component';
import { SurveyItemFormModalComponent } from './project/admin/components/admin-management/sidebar/surveys/admin-survey-list/admin-survey-item/survey-item-form-modal/survey-item-form-modal.component';
import { SurveyItemModalComponent } from './project/admin/components/admin-management/sidebar/surveys/admin-survey-list/admin-survey-item/survey-item-form-modal/survey-item-modal/survey-item-modal.component';
import { AnswerTypePipe } from './project/admin/pipes/answer-type.pipe';
import { SurveyReviewComponent } from './project/survey/components/survey-review/survey-review.component';
import { SurveyCompleteComponent } from './project/survey/components/survey-complete/survey-complete.component';
import { ImageHttpService } from './project/admin/services/image.http.service';
import { ImageDisplayPipe } from './project/admin/pipes/image-display.pipe';
import { SurveyLinkComponent } from './project/admin/components/admin-management/sidebar/survey-link/survey-link.component';
import { SurveyPauseResumeHttpService } from './project/survey/services/survey-pause-resume.http.service';
import { SurveyQuestionsHttpService } from './project/survey/services/survey-questions.http.service';
import { SurveyPausedComponent } from './project/survey/components/survey-paused/survey-paused.component';
import { ToastComponent } from './project/toast/components/toast/toast.component';
import { ToastListComponent } from './project/toast/components/toast-list/toast-list.component';
import { ToastService } from './project/toast/services/toast.service';
import { SurveyAdminHttpService } from './project/admin/services/survey-admin.http.service';
import { SurveyQuestionsAdminHttpService } from './project/admin/services/survey-questions-admin.http.service';
import { SurveyQuestionsSelectionsHttpService } from './project/admin/services/survey-questions-selections.http.service';
import { SurveyProviderService } from './project/survey/services/survey-provider.service';
import { LoadingComponent } from './project/common/loading/loading/loading.component';
import { EditQuestionModelComponent } from './project/survey/components/survey-question/edit-question-model/edit-question-model.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SurveyComponent,
    NavComponent,
    SurveyQuestionComponent,
    QuestionMultiSelectComponent,
    QuestionSingleSelectComponent,
    LoginComponent,
    AdminManagementComponent,
    SidebarComponent,
    AdminSurveyListComponent,
    AdminSurveyItemComponent,
    ModalContentComponent,
    ModalDirective,
    ModalFooterComponent,
    ModalHeaderComponent,
    SurveyItemDetailModalComponent,
    SurveyModalComponent,
    SurveyRemoveModalComponent,
    SurveyItemRemoveModalComponent,
    SurveyItemFormModalComponent,
    SurveyItemModalComponent,
    AnswerTypePipe,
    SurveyReviewComponent,
    SurveyCompleteComponent,
    ImageDisplayPipe,
    SurveyLinkComponent,
    SurveyPausedComponent,
    ToastComponent,
    ToastListComponent,
    LoadingComponent,
    EditQuestionModelComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    AuthModule.forRoot(environment),
    ToolsModule.forRoot(environment)
  ],
  providers: [
    ImageHttpService,
    SurveyHttpService,
    SurveyAdminHttpService,
    SurveyPauseResumeHttpService,
    SurveyQuestionsHttpService,
    SurveyQuestionsAdminHttpService,
    SurveyQuestionsSelectionsHttpService,
    SurveyService, 
    SurveyProviderService,
    ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
