import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoCharacterInput]',
  standalone: true,
})
export class NoCharacterInputDirective {
  constructor() { }

  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initalValue = event.target.value;
    event.target.value = initalValue.replace(/[^\D]*/g, '');
    if (initalValue !== event.target.value) {
      event.stopPropagation();
    }
  }
}
