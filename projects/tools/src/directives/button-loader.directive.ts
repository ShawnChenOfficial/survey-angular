import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[buttonLoader]'
})
export class ButtonLoaderDirective {

  @Input('buttonLoader') isLoading: boolean = false;

  child: any;

  constructor(private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {
      this.SetElement();
  }


  SetElement() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.child == null){
      this.el.nativeElement.classList.add('align-items-center');
      this.child = this.document.createElement('div');
      this.child.classList.add('d-none');
      this.child.classList.add('loading-icon');
      this.child.classList.add('px-1');
      const icon = this.document.createElement('i');
      icon.classList.add('bi');
      icon.classList.add('bi-arrow-clockwise');
      icon.classList.add('d-flex');
      this.renderer.appendChild(this.child, icon);
      this.renderer.appendChild(this.el.nativeElement, this.child);
    }

    if(changes['isLoading'].currentValue){
      this.child.classList.remove('d-none');
    }
    else{
      this.child.classList.add('d-none');
    }
  }
}
