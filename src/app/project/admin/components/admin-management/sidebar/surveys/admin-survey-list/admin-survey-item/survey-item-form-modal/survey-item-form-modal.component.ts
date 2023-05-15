import { FactoryTarget } from '@angular/compiler';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { SurveyQuestionAdminCommand, SurveyQuestionAdminForm, SurveyQuestionAdminImagesRollbackCommand } from 'src/app/project/admin/models/survey-question-admin';
import { ImageHttpService } from 'src/app/project/admin/services/image.http.service';
import { SurveyQuestionsAdminHttpService } from 'src/app/project/admin/services/survey-questions-admin.http.service';
import { ModalService } from 'src/app/project/modal/services/modal.service';
import { INJECT_DATA } from 'src/app/project/persistance/persistance';
import { AnswerType, SelectionOptionForm } from 'src/app/project/survey/models/survey-question';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { ToastService } from 'src/app/project/toast/services/toast.service';

@Component({
  selector: 'app-survey-item-form-modal',
  templateUrl: './survey-item-form-modal.component.html',
  styleUrls: ['./survey-item-form-modal.component.scss']
})
export class SurveyItemFormModalComponent implements OnInit {

  @ViewChild('scroll') private scrollBody!: ElementRef;

  title: string;
  form: SurveyQuestionAdminForm;
  isLoading = false;

  answerTypes = Object.values(AnswerType).filter(value => typeof value === 'string');

  selectedSelection?: SelectionOptionForm;

  constructor(@Inject(INJECT_DATA) data: SurveyQuestionAdminForm,
    private modalService: ModalService,
    private imageHttpService: ImageHttpService,
    private questionAdminHttpService: SurveyQuestionsAdminHttpService,
    private toastService: ToastService) {
    this.title = data ? 'Update Survey Question' : 'Create Survey Question';
    this.form = data;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollBody.nativeElement.scrollTop = this.scrollBody.nativeElement.scrollHeight;
    }
    catch { }
  }

  save() {
    this.isLoading = true;
    this.questionAdminHttpService.createOrUpdateSurveyQuestion(new SurveyQuestionAdminCommand(this.form))
      .subscribe({
        next: response => {
          if (response) {
            this.modalService.complete(true);
            this.isLoading = false;
          }
          else {
            this.toastService.show('Warning', 'Unknown failure occured while creating question', ToastEventType.Error);
            this.isLoading = false;
          }
        },
        error: error => {
          this.toastService.show('Error', error, ToastEventType.Error);
          this.isLoading = false;
        }
      })
  }

  close() {
    // let it work in background
    this.imageHttpService.rollbackUploads(new SurveyQuestionAdminImagesRollbackCommand(this.form)).subscribe();
    this.modalService.close();
  }

  createItem() {
    this.scrollToBottom();
    this.selectedSelection = new SelectionOptionForm();
  }

  setQuestionImage(event: any) {
    this.isLoading = true;
    this.imageHttpService.uploadImage(event.target.files[0]).subscribe({
      next: response => {
        this.form.questionImagePath = response;
        this.form.imageModified(response);
        this.isLoading = false;
      },
      error: error => {
        this.toastService.show('Error', error, ToastEventType.Error);
        this.isLoading = false;
      }
    })
  }

  removeQuestionImage(event: any) {
    event.target.files = [];
    this.form.questionImagePath = undefined;
  }

  itemCreatedOrUpdated(option: SelectionOptionForm) {
    if (this.form.selectOptions.filter(f => f.temId == option.temId).length <= 0) {
      this.form.selectOptions.push(option);
    }
    else {
      this.form.selectOptions.filter(f => f.temId == option.temId).forEach(f => {
        f.selection = option.selection;
        f.content = option.content;
        f.imagePath = option.imagePath;
      });
    }
    this.selectedSelection = undefined;
    this.form.selectOptions = this.form.selectOptions.sort((l, r) => l.selection!.localeCompare(r.selection!));
  }

  clearSelectedOption() {
    this.selectedSelection = undefined;
  }


  selectOptionType(option: AnswerType) {
    this.form.selectOptions.forEach(f => {
      if (this.IsImage && (option != AnswerType.ImageMultiSelection && option != AnswerType.ImageSelection)) {
        f.imagePath = undefined;
      }
    });
    this.form.answerType = option;
  }

  get IsImage() {
    return (this.form.answerType == AnswerType.ImageMultiSelection || this.form.answerType == AnswerType.ImageSelection);
  }

  updateOption(selection: SelectionOptionForm) {
    this.selectedSelection = selection.clone();
  }

  removeOption(event:any, optionToRemove: SelectionOptionForm) {
    event.stopPropagation();
    const index = this.form.selectOptions.indexOf(optionToRemove);
    this.form.selectOptions.splice(index, 1);
  }
}
