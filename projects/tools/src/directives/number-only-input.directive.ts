import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputNumberOnlyInput]'
})
export class NumberOnlyInputDirective {

  constructor(private el: ElementRef) {
  }

  private acceptedKeys = ['delete', 'insert', 'home', 'end', 'pageup', 'pagedown', 'backspace', 'tab', 'esc', 'enter', 'arrowleft', 'arrowright', 'arrowdown', 'arrowup'];

  @HostListener("keydown", ["$event"]) onKeyUp(event: KeyboardEvent) {
    let e = <KeyboardEvent> event;

    if (isNaN(Number(event.key)) || e.code.toLocaleLowerCase() === 'space') {
      if (this.acceptedKeys.indexOf(e.key.toLocaleLowerCase()) !== -1 ||
        // Allow: Ctrl+A
        (e.key.toLocaleLowerCase() === 'a' && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.key.toLocaleLowerCase() === 'c' && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.key.toLocaleLowerCase() === 'v' && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.key.toLocaleLowerCase() === 'x' && (e.ctrlKey || e.metaKey))) {
        // let it happen, don't do anything
        return;
      }
      e.preventDefault();

    }
  }
}
