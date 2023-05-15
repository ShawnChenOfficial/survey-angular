import { Component, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { INJECT_DATA } from 'src/app/project/persistance/persistance';
import { ModalDirective } from '../../directives/modal.directive';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {
  
  @Input()
  component: any;

  size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  data: any;

  @ViewChild(ModalDirective, { static: true }) modalDirective!: ModalDirective;

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    const viewContainerRef = this.modalDirective.viewContainerRef;

    viewContainerRef.clear();

    const injector = Injector.create([{
      provide: INJECT_DATA, useValue: this.data
    }])

    const ref = viewContainerRef.createComponent(this.component, { injector: injector });
  }

}
