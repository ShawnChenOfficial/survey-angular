import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageHttpService } from 'src/app/project/admin/services/image.http.service';
import { SelectionOptionForm } from 'src/app/project/survey/models/survey-question';
import { ToastEventType } from 'src/app/project/toast/models/toast';
import { ToastService } from 'src/app/project/toast/services/toast.service';

@Component({
  selector: 'app-survey-item-modal',
  templateUrl: './survey-item-modal.component.html',
  styleUrls: ['./survey-item-modal.component.scss']
})
export class SurveyItemModalComponent implements OnInit {

  @Input()
  selection!: SelectionOptionForm;

  formGroup!: FormGroup;

  @Input()
  isImg!: boolean;

  @Output()
  saveEvent = new EventEmitter<SelectionOptionForm>();

  @Output()
  closeEvent = new EventEmitter();

  @ViewChild('imagePreview')
  imageInput!: HTMLInputElement;

  selectedImg: any;

  isLoading = false;

  constructor(private imageHttpService: ImageHttpService, private toastService: ToastService) {

  }

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        selection: new FormControl(this.selection.selection, [Validators.required])
      })
  }

  save() {
    if (!this.formGroup.valid)
      return;
    if (this.isImg && this.selectedImg) {
      this.imageHttpService.uploadImage(this.selectedImg).subscribe({
        next: response => {
          this.selection.imagePath = response;
          this.selection.imageModified(response);
          this.saveEvent.emit(this.selection);
        },
        error: error => {
          this.toastService.show('Error', error, ToastEventType.Error);
        }
      })
    }
    else {
      this.saveEvent.emit(this.selection);
    }
  }

  setImg(event: any) {
    this.selectedImg = event.target.files[0];
    this.selection.imagePath = undefined;
  }

  close() {
    this.closeEvent.emit();
  }

  removeImage(){
    this.selection.imagePath = undefined;
    this.selectedImg = undefined;
  }

  get selectionValidator() { return this.formGroup.get('selection'); }

  get contentValidator() { return this.formGroup.get('content'); }
}
