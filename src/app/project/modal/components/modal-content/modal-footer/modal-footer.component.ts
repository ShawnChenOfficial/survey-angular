import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss']
})
export class ModalFooterComponent implements OnInit {

  @Output('save')
  saveEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output('remove')
  removeEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output('close')
  closeEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input('isLoading')
  isLoading = false;

  isCloseLoading = false;
  isRemoveLoading = false;
  isSaveLoading = false;

  constructor() { }

  ngOnInit(): void { }

  get toRemove() {
    return this.removeEvent.observers.length > 0;
  }

  get toClose() {
    return this.closeEvent.observers.length > 0;
  }

  get toSave() {
    return this.saveEvent.observers.length > 0;
  }

  OnChange(changes: SimpleChanges){
    if(changes['isLoading']){
      console.log(111);
    }
  }

  save() {
    this.saveEvent.emit();
    this.isSaveLoading = true;
  }

  remove() {
    this.removeEvent.emit();
    this.isRemoveLoading = true;
  }

  close() {
    this.closeEvent.emit();
    this.isCloseLoading = true;
  }
}
